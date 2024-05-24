import { CopyrightOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { useModel } from '@umijs/max';


export function Header() {
    const initialState = useModel('@@initialState') || {}
    return <h3>{initialState?.name}</h3>
}

export function Footer() {
    return <div style={{ textAlign: 'center', lineHeight: '100px' }}>
        <Space direction='horizontal' align='center'><CopyrightOutlined /> 民风淳朴米花町</Space>
    </div>
}
