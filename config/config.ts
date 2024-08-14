import { defineConfig } from '@umijs/max';
import routes from './routes';
import proxy from './proxy'

// console.log('process.env', process.env)
// 和 umirc.ts 选其一 umirc.ts 优先级高些

export default defineConfig({
    hash: false,
    history: { type: 'hash' },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
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
    headScripts: [
        '//api.map.baidu.com/api?v=3.0&ak=2Cj12hK8X1jz5STDaOUrGShTmyaw5aUB'
    ],
    chainWebpack: (config, { env }) => {
        if (env === 'production')
            config.merge({
                optimization: {
                    runtimeChunk: false,
                    splitChunks: {
                        chunks: 'async',
                        minSize: 30000,
                        minChunks: 2,
                        maxAsyncRequests: 5,
                        maxInitialRequests: 3,
                        automaticNameDelimiter: '.',
                        cacheGroups: {
                            vendor: {
                                name: 'vendors',
                                test({ resource }: any) {
                                    return /[\\/]node_modules[\\/]@ant-design/.test(resource);
                                },
                                priority: 10,
                            },
                            bundle: {
                                maxSize: 1500000,
                                name: 'bundle',
                                test({ resource }: any) {
                                    return /[\\/]node_modules[\\/]/.test(resource);
                                },
                                priority: 5,
                            },
                            page: {
                                minChunks: 1,
                                maxSize: 1024000,
                                name: 'page',
                                priority: 1,
                            },
                        }
                    }
                }
            })

        config.module
            .rule('mjs').test(/\.m?js$/)
            .resolve.set('fullySpecified', false)
    },
});
