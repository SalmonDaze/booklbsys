const Router = require('koa-router')
const adminController = require('../controller/admin')

const adminRouter = new Router()

adminRouter.post('/checkAllUser', adminController.userInfoCheck)

module.exports = adminRouter