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
                name: '探图',
                path: '/travel',
                component: './Travel',
            },
            {
                name: '记账',
                path: '/account',
                component: './Account'
            },
            {
                name: '计划',
                path: '/plan',
                component: './Plan'
            }
        ]
    },

]