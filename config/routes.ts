export default [
    {
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
            }
        ]
    },

]