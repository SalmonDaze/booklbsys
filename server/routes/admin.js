const Router = require('koa-router')
const adminController = require('../controller/admin')
const upload = require('../utils/upload')
const adminRouter = new Router()
const multer = require('koa-multer')
const body = require('koa-better-body')

// 获得所有用户信息
adminRouter.post('/checkAllUser', adminController.userInfoCheck)
// 上传书封面
adminRouter.post('/uploadCover', upload.single('file'), adminController.uploadCover)
// 上传书本信息
adminRouter.post('/uploadBook', adminController.uploadBook)
// 封禁用户
adminRouter.post('/banUser', adminController.banUser)
// 解封用户
adminRouter.post('/unBanUser', adminController.unBanUser)
// 查询用户信息
adminRouter.post('/getUserInfo', adminController.getUserInfo)
// 获得所有书本信息
adminRouter.post('/getAllBook', adminController.getAllBook)
// 即将到期书本名单
adminRouter.post('/sevenDaysExpire', adminController.sevenDaysExpire)
// 7天内借阅书本名单
adminRouter.post('/sevenDaysBorrow', adminController.sevenDaysBorrow)
// 删除书信息
adminRouter.post('/deleteBook', adminController.deleteBook)
module.exports = adminRouter