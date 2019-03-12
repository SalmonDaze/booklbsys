const Router = require('koa-router')
const userController = require('../controller/user')

const childRouter = new Router()

// 注册api
childRouter.post('/register', userController.registry)
//登陆api
childRouter.post('/login',userController.login )


module.exports = childRouter