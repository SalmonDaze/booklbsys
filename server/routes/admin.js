const Router = require('koa-router')
const adminController = require('../controller/admin')
const upload = require('../utils/upload')
const adminRouter = new Router()
const multer = require('koa-multer')

// 获得所有用户信息
adminRouter.post('/checkAllUser', adminController.userInfoCheck)
// 上传书封面
adminRouter.post('/uploadCover', upload.single('file'), adminController.uploadCover)
// 上传书本信息
//adminRouter.post('/uploadBook', adminController.uploadBook)

module.exports = adminRouter