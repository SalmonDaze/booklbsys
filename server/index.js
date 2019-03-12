const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const userRouter = require('./routes/user')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');

app.use(cors({
    origin: function (ctx) {
        return 'http://192.168.2.144:8081';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())
router.use('/api', userRouter.routes(), userRouter.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000)