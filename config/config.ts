import { defineConfig } from '@umijs/max';
import routes from './routes';
import proxy from './proxy'

// console.log('process.env', process.env)
// 和 umirc.ts 选其一 umirc.ts 优先级高些

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '@umijs/max',
    },
    routes,
    proxy: proxy['dev'],
    npmClient: 'yarn',
});
