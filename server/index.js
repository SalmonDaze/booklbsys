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

let userSocket = {}
io.on('connection', (socket) => {
    socket.on('new user', (phone) => {
        if( !(phone in userSocket) ){
            socket.phone = phone
            userSocket[ phone ] = socket
        } else {
            userSocket[ phone ].emit('relogin')
        }
    })
    socket.on('sendMsg', (recipient) => {
        console.log(recipient)
        console.log(recipient in userSocket)
        console.log(userSocket[ recipient ])
        userSocket[ recipient ].emit('refresh')
    })
})

server.listen(3000)