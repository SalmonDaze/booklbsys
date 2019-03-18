const Router = require('koa-router')
const userController = require('../controller/user')

const childRouter = new Router()

// 注册api
childRouter.post('/register', userController.registry)
//登陆api
childRouter.post('/login', userController.login )
// 查询所有书
childRouter.post('/getAllBook', userController.getAllBook)
//续借书
childRouter.post('/bookBorrowContinue', userController.bookBorrowContinue)
// 借书
childRouter.post('/borrowBook', userController.borrowBook)
// 还书
childRouter.post('/returnBook', userController.returnBook)
module.exports = childRouter