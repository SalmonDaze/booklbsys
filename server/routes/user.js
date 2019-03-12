const Router = require('koa-router')
const userController = require('../controller/user').registry

const chlidRouter = new Router()
chlidRouter.post('/register', userController)

module.exports = chlidRouter