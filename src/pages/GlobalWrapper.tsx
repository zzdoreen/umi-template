// https://umijs.org/docs/guides/routes outlet渲染子路由
import { Outlet } from 'umi'

export default function GlobalWrapper() {
    return <div style={{ height: 'calc(100vh - 160px)', width: '100%', overflow: 'auto', padding: 20, borderBottom: '1px solid rgba(5, 5, 5, 0.06)' }}>
        <Outlet />
    </div>
}