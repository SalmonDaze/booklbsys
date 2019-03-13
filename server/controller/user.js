const Model = require('../database/module')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/default').SECRET

const l_findUser = async (username) => {
    return new Promise((resolve, reject) => {
        Model.user.findOne({username: username}).then( (doc) => {
            resolve(doc)
        })
    })
}

module.exports.registry = async (ctx) => {
    let { username, password } = ctx.request.body
    if ( !username || username.length > 18 ) {
        ctx.body = {
            code: 1,
            success: false,
            msg: '用户名格式错误! '
        }
    }
    console.log(username, password)
    let doc = await l_findUser('salmon')
    if( doc ) {
        ctx.status = 200
        ctx.body = {
            code: 1,
            success: false,
            msg: '用户已被注册！'
        }
    }else {
        await Model.user.create({username: 'salmon', password: '123'}).then(() => {
            ctx.status = 200
            ctx.body = {
                code: 200,
                success: false,
                msg: '注册成功！'
            }
        })
    }
}

module.exports.login = async (ctx) => {
    let { username, password } = ctx.request.body
    let user = await l_findUser(username)
    console.log(user)
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
        console.log(username)
        ctx.cookies.set(
            'token', token, {
                maxAge: 60 * 60 * 1000 * 24
            }
        )
        ctx.status = 200
        ctx.body = {
            code: 200,
            success: true,
            msg: '登陆成功！'
        }
    }
}