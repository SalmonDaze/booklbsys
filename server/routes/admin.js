const Router = require('koa-router')
const adminController = require('../controller/admin')
const upload = require('../utils/upload').upload
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
// 过的逾期书本名单
adminRouter.post('/getDelayList', adminController.getDelayList)
// 查询即将到期书本名单
adminRouter.post('/delayingBookList', adminController.delaingBookList)
// 获得未归还书本名单
adminRouter.post('/unReturnBookList', adminController.unReturnBookList)
// 获得未借出书本名单
adminRouter.post('/getUnlendingList', adminController.getUnlendingList)
// 查询特定用户信息
adminRouter.post('/getOneUserInfo', adminController.getOneUserInfo)
// 同意申请借阅
adminRouter.post('/applySuccess', adminController.applySuccess)
// 拒绝申请借阅
adminRouter.post('/applyFail', adminController.applyFail)
// 同意归还图书
adminRouter.post('/applyReturnSuccess', adminController.applyReturnSuccess)
// 拒绝归还图书
adminRouter.post('/applyReturnFail', adminController.applyReturnFail)
// 获得申请借阅列表
adminRouter.post('/getApplyList', adminController.getApplyList)
module.exports = adminRouter