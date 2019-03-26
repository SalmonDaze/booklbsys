const Router = require('koa-router')
const userController = require('../controller/user')

const childRouter = new Router()

// 注册api
childRouter.post('/register', userController.registry)
//登陆api
childRouter.post('/login', userController.login )
// 根据token登录
childRouter.post('/loginByToken', userController.loginByToken)
// 查询所有书
childRouter.post('/getAllBook', userController.getAllBook)
//续借书
childRouter.post('/bookBorrowContinue', userController.bookBorrowContinue)
// 借书
childRouter.post('/borrowBook', userController.borrowBook)
// 还书
childRouter.post('/returnBook', userController.returnBook)
// 查询热门书籍
childRouter.post('/getHotBook', userController.getHotBook)
// 查询最新上架
childRouter.post('/getNewBook', userController.getNewBook)
// 查询用户借阅记录
childRouter.post('/getUserBorrowList', userController.getUserBorrowList)
// 申请借书
childRouter.post('/applyBorrowBook', userController.applyBorrowBook)
// 查询某本书信息
childRouter.post('/getOneBookInfo', userController.getOneBookInfo)
module.exports = childRouter