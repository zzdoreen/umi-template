export default {
    dev: {
        '/v1': {
            target: 'http://8.140.175.191:6062/',
            changeOrigin: true,
            pathRewrite: { '^/v1': '/v1' },
        },
    }
};
