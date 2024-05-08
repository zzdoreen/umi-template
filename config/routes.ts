export default [
    {
        name: '打印',
        path: '/detail/print',
        layout: false,
        hideInMenu: true,
        component: './Print'
    }
    , {
        path: '/',
        flatMenu: true,
        component: './GlobalWrapper',
        routes: [
            {
                path: '/',
                component: './RedirectRoot'
            },
            {
                name: '首页',
                path: '/home',
                access: 'dynamicRoute',
                component: './Home',
            },
            {
                name: '权限',
                path: '/access',
                access: 'dynamicRoute',
                routes: [
                    {
                        path: '/access',
                        redirect: '/access/list'
                    },
                    {
                        path: '/access/list',
                        name: '列表',
                        access: 'dynamicRoute',
                        component: './Access'
                    }
                ]
            },
            {
                name: 'CRUD 示例',
                path: '/table',
                access: 'dynamicRoute',
                component: './Table',
            },
            {
                name: 'Echarts 示例',
                path: "/echarts",
                component: './Echarts'
            },
            {
                name: '导出',
                path: '/export',
                component: './Export'
            },
            {
                name: '打印',
                path: '/print',
                component: './Print'
            }
        ]
    },

]