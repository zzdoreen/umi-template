import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ProTable, { ActionType, ProColumns, ProTableProps } from "@ant-design/pro-table";
import { SearchConfig } from "@ant-design/pro-table/lib/components/Form/FormRender";
import { Button, Col, Row, Modal, ButtonProps, ModalProps } from "antd";
import { FormInstance } from "antd/lib/form";
import classNames from "classnames";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from './index.less'
import { merge } from "@ant-design/pro-components";

const indexColumn: ProColumns<any> = {
    title: '序号',
    valueType: 'index',
    key: 'index',
    width: 100,
    render: (_, __, index, { pageInfo: { pageSize = 0, current = 1 } = {} as any }: any) => <div style={{ padding: '5px 0' }}>{current * pageSize + index + 1 - pageSize}</div>,
}
export function useProTable<T>(config: { columns: ProColumns<T>[], request?: ProTableProps<T, AnyForm>['request'], showIndexColumn?: boolean }) {
    const { columns, request, showIndexColumn = true } = config
    const newColumns: typeof columns = useMemo(() => {
        return (showIndexColumn ? [indexColumn, ...columns] : columns).map(
            column => merge({//默认配置
                align: column.valueType === 'option' ? 'center' : undefined,//操作栏居中
                fieldProps: { allowClear: column.valueType !== 'digit' ? true : undefined, placeholder: null },//表单可清除，无提示
                filters: undefined, //枚举不展示筛选漏斗图标
            }, column)
        )
    }, [columns])
    const actionRef = useRef<ActionType>()

    const reload = useCallback(
        (resetPageIndex?: boolean) => actionRef.current?.reload(resetPageIndex)
        , [actionRef])

    const [modal, setModal] = useState<FormModalState>({
        visible: false
    });

    return {
        setModal,
        modal,
        reload,
        proTableProps: {
            request,
            columns: newColumns,
            setModal,
            actionRef,
            rowKey: 'id'
        },
        proFormModalProps: {
            modal,
            setModal,
            columns: newColumns,
        }
    }
}

export interface FormModalState {
    isAdd?: boolean
    visible: boolean,
    defaultFormValues?: object,
    title?: string
}
export interface AnyForm {
    [key: string]: any
}
export interface ExtroProTableProps {
    /**
     * 搜索栏右侧额外的自定义按钮等
     */
    extraActions?: React.ReactNode[] | React.ReactFragment
    /**
     * 搜索框的响应式布局配置
     */
    searchSpan?: SearchConfig['span']
    /**
     * truthys时展示新增按钮，modal标题
     */
    addText?: string
    addButtonProps?: ButtonProps,
    hideSearchButton?: boolean
}

export function ProFormModal<T>(props: ProTableProps<T, AnyForm> & { hasRestFooter?: boolean, refreshTime?: { flag: boolean, name: string } } & {
    modelProps?: ModalProps
    modal: FormModalState, setModal: React.Dispatch<React.SetStateAction<FormModalState>>
    onCancel?: (v: AnyForm) => void | boolean
}) {
    //modal参数从props传入，避免重新生成Modal
    const { onSubmit, modal, setModal, hasRestFooter = false, refreshTime = { flag: false, name: 'createdAt' }, modelProps, onCancel = false, ...restProps } = props
    const form = useRef<FormInstance>();

    // 时间刷新
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null
        const { isAdd, visible, title } = modal
        if ((isAdd || title === '处理') && refreshTime.flag && visible)
            timer = setInterval(() => form.current?.setFieldsValue({ ...form.current?.getFieldsValue(), [refreshTime?.name]: moment() }), 1000)
        return () => {
            if (timer) clearInterval(timer)
        }
    }, [modal.visible, modal.isAdd, refreshTime, modal.title])

    useEffect(() => {
        setModal(s => ({ ...s, isAdd: !modal.defaultFormValues }))
    }, [modal.visible, modal.defaultFormValues]);

    useEffect(() => {//modal显示、有默认数据时,填充默认值
        const { visible, defaultFormValues } = modal
        if (visible) {
            form.current?.resetFields()
            if (defaultFormValues) form.current?.setFieldsValue(defaultFormValues)
        }
    }, [modal.visible, modal.defaultFormValues]);

    const newRestProps = useMemo(() => merge({
        form: {
            layout: 'horizontal',
            labelCol: { span: 6 },
            submitter: false
        }
    }, restProps), [restProps])

    const [loading, setloading] = useState(false);
    return <Modal visible={modal.visible} title={modal.title} className={styles.modal}
        onCancel={() => {
            // 解决取消上传后file异常
            if (onCancel)
                onCancel(form.current?.getFieldsValue())
            // if (!onCancel) {
            form.current?.setFieldsValue({ file: [] })
            setModal({ visible: false })
            // } else {
            // }
        }}
        forceRender maskClosable={false}
        onOk={() => form.current?.validateFields().then(val => {
            setloading(true)
            // onSubmit必须返回Promise
            return onSubmit?.(val)
        }).finally(() => setloading(false))}

        okButtonProps={{ loading }}

        {...hasRestFooter && {
            footer: [
                <Button key='reset' onClick={() => form.current?.setFieldsValue({ ...modal.defaultFormValues, content: '', result: '' })}>重置</Button>,
                <Button key='submit' type="primary" onClick={() => form.current?.validateFields().then(val => {
                    setloading(true)
                    // onSubmit必须返回Promise
                    return onSubmit?.(val)
                }).finally(() => setloading(false))}>保存</Button>
            ]
        }}
        {...modelProps}
    >
        <ProTable
            type="form"
            formRef={form}
            {...newRestProps}
        />
    </Modal >
}

export default function <T>(props: ProTableProps<T, AnyForm> & ExtroProTableProps & { setModal?: React.Dispatch<React.SetStateAction<FormModalState>> }) {
    const {
        searchSpan = 6, extraActions, addText, addButtonProps, hideSearchButton,
        className, actionRef, setModal, ...restProps
    } = props
    const newProps: ProTableProps<T, AnyForm> = merge({
        options: false,
        toolBarRender: false,
        actionRef,
        pagination: { size: 'default', defaultPageSize: 10, showSizeChanger: true },
        className: classNames(styles.table, className),
        search: {
            span: searchSpan,
            optionRender: (_, __, dom: any) => <Row justify="space-between">
                {!hideSearchButton ?
                    React.cloneElement(dom[1], { icon: <SearchOutlined /> })
                    :
                    <span></span>
                }
                <Col >
                    {addText && <Button type="primary" icon={<PlusOutlined />}
                        onClick={() => setModal!({ visible: true, title: addText })}
                        {...addButtonProps}
                    >{addText}</Button>}
                    {extraActions}
                </Col>
            </Row> as unknown as React.ReactNode[],
        }
    } as ProTableProps<T, AnyForm>, restProps)
    return <ProTable {...newProps as any} />
}