const cors = require('koa2-cors')

let corso = cors({
    origin: function (ctx) {
        return 'http://192.168.2.73:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'accessToken'],
})

module.exports = corso