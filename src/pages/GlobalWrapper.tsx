// https://umijs.org/docs/guides/routes outlet渲染子路由
import { Outlet } from 'umi'

export default function GlobalWrapper() {
    return <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
        <Outlet />
    </div>
}