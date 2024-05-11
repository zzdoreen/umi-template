import {
    ProForm,
    ProFormList,
    ProFormText,
    ProFormMoney,
    ProFormDigit,
    ProFormSelect,
    ProFormInstance,
    ProFormCascader,
    ProFormTreeSelect,
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormRadio,
    ProFormCheckbox,
    ProFormDependency,
    ProFormTextArea,
    BetaSchemaForm,
    ProFormColumnsType,
} from "@ant-design/pro-components"
import './index.less'
import { useRef } from "react"
import moment from "moment"
import { Button, Input } from "antd"
/* 

1. 如果想要设置默认值，请使用 initialValues，任何直接使用组件 value 和 onChange 的方式都有可能导致值绑定失效

2. 如果想要表单联动或者做一些依赖，可以使用 render props 模式，ProFormDependency 绝对是最好的选择

3. ProForm 的 onFinish 与 antd 的 Form 不同，是个 Promise，如果你正常返回会自动为你设置按钮的加载效果

4. 如果想要监听某个值，建议使用 onValuesChange。保持单向的数据流无论对开发者还是维护者都大有裨益

*/

enum SexType {
    FEMALE = 1,
    MALE = 2
}
export default function Form() {
    const formRef = useRef<ProFormInstance<{ name: string, sex: string }>>()
    const obj = {
        name: 'doreen',
        sex: 2,
        date: '2024-06-03'
    }

    const handleFinish = (v) => {
        formRef.current?.validateFields()
            .then((a) => {
                // a 原始数据、v 处理过的数据
                console.log('?? vaild', a, v)
            })
            .catch((e => console.error(e)))
            .finally(() => console.log('finally'))
    }

    const handleValuesChange = (v) => {
        console.log('valueschange', v)
    }

    const columns: ProFormColumnsType<any>[] = [
        {
            title: '标题',
            dataIndex: 'title',
            initialValue: '必填',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
            width: 'm',
        },
        {
            title: '状态',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
                all: { text: '全部', status: 'Default' },
                open: {
                    text: '未解决',
                    status: 'Error',
                },
                closed: {
                    text: '已解决',
                    status: 'Success',
                    disabled: true,
                },
                processing: {
                    text: '解决中',
                    status: 'Processing',
                },
            },
            width: 'm',
            tooltip: '当title为disabled时状态无法选择',
            fieldProps: (form) => {
                if (form.getFieldValue('title') === 'disabled') {
                    return {
                        disabled: true,
                        placeholder: 'disabled',
                    };
                } else {
                    return {
                        placeholder: 'normal',
                    };
                }
            },
        },
        {
            title: '标签',
            dataIndex: 'labels',
            width: 'm',
            tooltip: '当title为必填时此项将为必填',
            dependencies: ['title'],
            formItemProps(form) {
                if (form.getFieldValue('title') === '必填') {
                    return {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    };
                } else {
                    return {};
                }
            },
        },
        {
            valueType: 'dependency',
            name: ['title'],
            columns: ({ title }) => {
                return title !== 'hidden'
                    ? [
                        {
                            title: 'title为hidden时隐藏',
                            dataIndex: 'hidden',
                            valueType: 'date',
                            renderFormItem: () => {
                                return <Input />;
                            },
                        },
                    ]
                    : [];
            },
        },
        {
            title: '创建时间',
            key: 'showTime',
            dataIndex: 'createName',
            valueType: 'date',
        },
    ];


    return <div className="form-container">
        <ProForm className="form" layout="horizontal" formRef={formRef} labelCol={{ span: 6 }} initialValues={obj} onFinish={handleFinish}
            onValuesChange={handleValuesChange} >
            <ProFormText name='name' label='输入框' rules={[{ required: true }, { max: 10 }]} />
            <ProFormSelect name='sex' label='选择' options={[{ value: SexType.FEMALE, label: '女' }, { value: SexType.MALE, label: '男' }]} />
            <ProFormDigit name='num' label='数字' min={1} max={10} fieldProps={{ precision: 0 }} />
            <ProFormDatePicker name='date' label='日期' transform={(value, _namePath, _allValues) => moment(value).startOf('day').unix()} />
            <ProFormDateRangePicker name='date-range' label='日期区间' />
            <ProFormCascader name='cascadar' label='级联' />
            <ProFormTreeSelect name='tree' label='树形' />
            <ProFormMoney name='money' label='价格' />
            <ProFormList name='list' label='列表' creatorButtonProps={{ position: 'top', creatorButtonText: '新增' }}
                copyIconProps={false} deleteIconProps={{ tooltipText: '删除' }}
                actionRender={(field, action, defaultActionDom, count) => [...defaultActionDom,
                <Button key='extra-btn' onClick={() => console.log(field, action, defaultActionDom, count)}>extra action</Button>]
                }>
                {
                    (_allValues, _index, opts) => {
                        console.log(_allValues, _index, opts)
                        return <>
                            <ProFormRadio.Group name='radio' options={[{ label: 'item 1', value: 1 }, { label: 'item 2', value: 2 }]} />
                            <ProFormCheckbox.Group name='checkbox' options={['互联网', '制造业', '农业', '服务业']} />
                            <hr />
                        </>
                    }
                }
            </ProFormList>
            <ProFormDependency name={['sex']}>
                {
                    ({ sex }) => {
                        if (sex === SexType.FEMALE)
                            return <ProFormTextArea label='关联项目' name='link' />
                        else if (sex === SexType.MALE)
                            return <ProFormCheckbox.Group label='关联项目' name='link' options={['互联网', '制造业', '农业', '服务业']} />
                    }
                }
            </ProFormDependency>
        </ProForm>
        
        {/* json表单 */}
        <BetaSchemaForm
            className="form"
            layout="horizontal" labelCol={{ span: 6 }}
            shouldUpdate={(newValues, oldValues) => {
                if (newValues.title !== oldValues?.title)
                    return true;
                return false;
            }}
            layoutType="Form"
            onFinish={async (values) => {
                console.log(values);
            }}
            columns={columns}
        />
    </div>
}