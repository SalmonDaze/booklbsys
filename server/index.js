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
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

app.use(static(__dirname + '/public/uploads'))
app.use(corso)
app.use(jsonwebtoken)
app.use(auth)
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

router.use('/api', userRouter.routes(), userRouter.allowedMethods())
router.use('/admin', adminRouter.routes(), adminRouter.allowedMethods())

let onlineUser = [],
    sockets = {}
io.on('connection', (socket) => {
    socket.on('new user', (phone) => {
        socket.phone = phone
        onlineUser.push(socket)
        sockets[ phone ] = socket.id
    })
    socket.on('sendMsg', (recipient) => {
        socket.broadcast.emit('refresh', recipient)
    })
    socket.on('disconnect', () => {
        delete sockets[ socket.phone ]
    })
})

server.listen(3000)