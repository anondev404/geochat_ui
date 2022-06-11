/*const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        (req, res, next) => {
            console.log('handing over to proxy...');
            console.log(req.data);
            next();
        },
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
};*/