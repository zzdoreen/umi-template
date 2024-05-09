import { ProColumns, ProFormText, ProTable } from "@ant-design/pro-components";
import { useControllableValue } from "ahooks";
import { Button } from "antd";
import { useEffect, useMemo } from "react";
import { Access } from "umi";

export function TableListFormItem(props: any) {
    const { value, onChange } = props
    const [table, onTableChange] = useControllableValue({ value, onChange })

    useEffect(() => {
        if (!table || table.length < 1) onTableChange([{ key: new Date().getTime() }])
    }, [])

    const handleAddOrDel = (index?: number) => {
        const isAdd = index === undefined || index === null
        onTableChange((v: any[]) => {
            const data = isAdd ? [...v, { key: new Date().getTime() }] : v.filter((_: any, i: number) => i !== index)
            return data
        })
    }

    const columns: ProColumns[] = useMemo(() => [
        {
            title: 'name',
            dataIndex: 'name',
            render: (_, __, index) => <ProFormText name={['table', index, 'name']} />
        },
        {
            title: 'sex',
            dataIndex: 'sex',
            render: (_, __, index) => <ProFormText name={['table', index, 'sex']} />
        },
        {
            title: 'opt',
            dataIndex: 'option',
            render: (_, __, index) => <Access accessible={index === 0}
                fallback={<Button size="small" type="primary" shape="circle" danger onClick={() => handleAddOrDel(index)}>-</Button>}>
                <Button shape="circle" size="small" onClick={() => handleAddOrDel()}>＋</Button>
            </Access>
        },
        {
            title: 'key',
            dataIndex: 'key',
            hideInTable: true
        }
    ], [])

    return <ProTable columns={columns} pagination={false} search={false} dataSource={table} options={false} />
}