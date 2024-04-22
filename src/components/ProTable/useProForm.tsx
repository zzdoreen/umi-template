import { BaseResponse } from "@/services/entities";
import { ModalConfirm } from "@/utils/tools";
import { ProFormProps } from "@ant-design/pro-form";
import { useBoolean } from "ahooks";
import { Button, message, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from './index.less';


export default function useProForm<T extends object>(props: {
    getService: (vals?: any, cancel?: boolean) => Promise<BaseResponse<T>>
    updateService: (vals: T) => Promise<BaseResponse<any>>,
    manual?: boolean //是否手动请求数据
    onSuccess?: (data?: any) => void
} & ProFormProps) {

    const { className, layout = 'horizontal', getService, updateService, manual, onSuccess } = props

    const [disabled, setDisabled] = useState(true);
    const [form] = useForm()
    const [update, { toggle }] = useBoolean()

    useEffect(() => {
        if (manual) return
        // 获取最新的配置
        getService().then(({ code, data, message: msg }) => {
            if (code === 0) {
                form.setFieldsValue(data)
            } else {
                message.error(msg || '查询失败')
            }
        })
    }, [update, manual]);

    return {
        disabled,
        setDisabled,
        proformProps: {
            layout,
            className: classNames(styles.form, className),
            form,
            onFinish: async (vals: any) => {
                return new Promise<void>(res => {
                    ModalConfirm({
                        title: '确定修改此配置吗？',
                        onOk() {
                            updateService(vals).then(({ code, message: msg, data }) => {
                                const isOk = code === 0
                                if (isOk) {
                                    message.success(`修改成功`)
                                    setDisabled(true)
                                    onSuccess?.(data)
                                } else message.error(msg || `修改失败`)
                            }).then(res)
                        },
                        onCancel: () => res()
                    })
                })
            },
            submitter: {
                render: ({ submitButtonProps }, defaultDom) => {
                    const loading = (submitButtonProps as any)?.loading
                    if (disabled) {
                        return <Button type="primary" onClick={() => setDisabled(false)} >编辑</Button>
                    } else {
                        return <Space size='large' >
                            <Button onClick={() => { toggle(); setDisabled(true) }} disabled={loading} >取消</Button>
                            {defaultDom[1]}
                        </Space>
                    }
                },
                searchConfig: { submitText: '保存' }
            } as ProFormProps['submitter']
        }
    }
}