const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const userRouter = require('./routes/user')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const jwt = require('jsonwebtoken')
const config = require('./config/default')

app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())

// 路由拦截判定token有效限
app.use( async (ctx, next) => {
    const authUrl = ['/api/login', '/api/register']
    let token = ctx.header
    let url = authUrl.find( url => url === ctx.url)
    if( url ) {
        await next()
    } else {
        jwt.verify(token, config.SECRET, async (err, decoded) => {
            if( err ) {
                ctx.body = {
                    code: 400,
                    msg: 'token失效'
                }
            }else {
                await next()
            }
        })
    }
})
router.use('/api', userRouter.routes(), userRouter.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000)