const Router = require('koa-router')
const userController = require('../controller/user')

const childRouter = new Router()

// 注册api
childRouter.post('/register', userController.registry)
//登陆api
childRouter.post('/login', userController.login )
//查询所有用户

// 查询所有书
childRouter.post('/getAllBook', userController.getAllBook)

// 借书
childRouter.post('/borrowBook', userController.borrowBook)
module.exports = childRouter