const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const jsonwebtoken = require('./middleware/jsonwebtoken')
const corso = require('./middleware/cors')
const auth = require('./middleware/auth')

app.use(static(__dirname + '/public/uploads'))
app.use(corso)
app.use(jsonwebtoken)
app.use(auth)
app.use(bodyParser())

router.use('/api', userRouter.routes(), userRouter.allowedMethods())
router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000)