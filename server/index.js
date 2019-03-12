const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const userRouter = require('./routes/user')
const bodyParser = require('koa-bodyparser')

router.use('/api', userRouter.routes(), userRouter.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
app.use(bodyParser())

app.listen(3000)