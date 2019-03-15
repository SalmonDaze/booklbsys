const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const jwt = require('jsonwebtoken')
const config = require('./config/default')
const multer = require('koa-multer')
const moment = require('moment')

let t1 = '2031-04-11T01:53:02.807Z'
let t2 = '2019-03-15T13:47:02.807'

app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'accessToken'],
}))

app.use(bodyParser())

// 路由拦截判定token有效限
app.use( async (ctx, next) => {
    const authUrl = ['/api/login', '/api/register']
    let token = ctx.header.accesstoken
    let url = authUrl.find( url => url === ctx.url)
    if( url ) {
        await next()
    } else {
        let anext = await new Promise((resolve, reject) => {
            jwt.verify(token, config.SECRET, async (err, decoded) => {
                if( err ) {
                    resolve({
                        code: 1,
                        msg: 'token已失效'
                    })
                }else {
                    resolve(next)
                }
            })
        })
        if( typeof anext === 'function') {
            await anext()
        } else {
            ctx.body = anext
        }
    }
})
router.use('/api', userRouter.routes(), userRouter.allowedMethods())
router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000)