const Model = require('../database/module')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/default').SECRET
const crypto = require('crypto')

function cryptPwd(password, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function dpPwd(password, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(password, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const l_findUser = async (username) => {
    return new Promise((resolve, reject) => {
        Model.user.findOne({username: username}).then( (doc) => {
            resolve(doc)
        })
    })
}

const l_findPhone = async (phone) => {
    return new Promise((resolve, reject) => {
        Model.user.findOne({phone: phone}).then( (doc) => {
            resolve(doc)
        })
    })
}

const l_findAllUser = async () => {
    return new Promise ((resolve, reject) => {
        Model.user.find({}).then( (doc) => {
            resolve(doc)
        })
    })
}

module.exports.registry = async (ctx) => {
    let { username, password, phone } = ctx.request.body
    let userCount = await l_findAllUser()
    password = cryptPwd(String(password), SECRET)
    let nameReg = /^1[0-9]{10}$/
    if ( !nameReg.test(phone) ) {
        ctx.status = 200
        return ctx.body = {
            code: 1,
            success: false,
            msg: '手机号码格式错误! '
        }
    }
    let doc = await l_findPhone(phone)
    if( doc ) {
        ctx.status = 200
        ctx.body = {
            code: 1,
            success: false,
            msg: '手机号已被注册！'
        }
    }else {
        await Model.user.create({username: username, password: password, UID: userCount.length + 1, phone: phone}).then(() => {
            ctx.status = 200
            ctx.body = {
                code: 200,
                success: true,
                msg: '注册成功！'
            }
        })
    }
}

module.exports.login = async (ctx) => {
    let { username, password } = ctx.request.body
    let user = await l_findUser(username)
    user.password = dpPwd(user.password, SECRET)
    if( !user || user.password !== password) {
        ctx.status = 200
        ctx.body = {
            success: false,
            code: 1,
            msg: '用户名或者密码错误！'
        }
        return
    }
    if( user.password === password ) {
        let token = jwt.sign({username: username}, SECRET, {
            expiresIn : 60*60*24// 授权时效24小时
        });
        ctx.status = 200
        ctx.body = {
            code: 200,
            success: true,
            token: token,
            msg: '登陆成功！'
        }
    }
}