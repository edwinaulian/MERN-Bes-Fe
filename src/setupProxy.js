const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        '/apiv1',
        createProxyMiddleware({
            target: 'http://localhost:8080/',
            changeOrigin: true,
        })
    ),

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3002/posts',
            changeOrigin: true,
        })
    )
}