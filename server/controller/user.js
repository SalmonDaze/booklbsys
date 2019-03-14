const Model = require('../database/module')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/default').SECRET
const crypto = require('crypto')
const moment = require('moment')

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

const l_findAllBook = async () => {
    return new Promise ((resolve, reject) => {
        Model.book.find({}).then( doc => {
            resolve(doc)
        })
    })
}

const l_findBook = async (_id) => {
    return new Promise ((resolve, reject) => {
        Model.book.findOne({_id}).then( doc => {
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
    let { phone, password } = ctx.request.body
    let user = await l_findPhone(phone)
    user.password = dpPwd(user.password, SECRET)
    if( !user || user.password !== password) {
        ctx.status = 200
        ctx.body = {
            success: false,
            code: 1,
            msg: '手机号或者密码错误！'
        }
        return
    }
    if( user.password === password ) {
        let token = jwt.sign({phone: phone}, SECRET, {
            expiresIn : '1d'// 授权时效24小时
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

module.exports.getAllBook = async (ctx) => {
    let bookList = await l_findAllBook()
    ctx.status = 200
    ctx.body = {
        code: 200,
        success: true,
        msg: '查询成功！',
        data: bookList
    }
}

module.exports.borrowBook = async (ctx) => {
    let { _id, phone } = ctx.request.body
    const { borrowCycle } = await l_findBook(_id)
    let anext = async () => {
        return new Promise((resolve, reject ) => {
            if ( !_id || !phone ) {
                resolve({
                    code: 1,
                    success: false,
                    msg: '操作失败'
                })
            }
            Model.book.updateOne({ _id }, {
                isLending: true, 
                borrowTime: Date.now(), 
                borrowUser: phone, 
                returnTime: moment(Date.now()).add(borrowCycle, 'days')
            }, (err, doc) => {
                if(err) {
                    resolve({
                        code: 1,
                        success: false,
                        msg: '操作失败'
                    })
                }
                
                Model.user.findOne({ phone }).then( doc => {
                    
                    let isBorrowed = doc.borrow_list.some( (_vid) => {
                        return String(_vid) === String(_id)
                    })
                    if ( isBorrowed ) {
                        resolve({
                            code: 1,
                            success: false,
                            msg: '不能重复借同本书！'
                        })
                    }
                    doc.borrow_list.push(_id)
                    doc.save()
                }).then(() => {
                    resolve({
                        code: 200,
                        success: true,
                        msg: '操作成功'
                    })
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.bookBorrowContinue = async (ctx) => {
    let { time } = ctx.request.body
    let anext = async () => {
        return new Promise( (resolve, reject) => {
            Model.book.updateOne({ _id }, {borrowCycle: borrowCycle += time}, (err, doc) => {
                if(err) {
                    resolve({
                        code: 1,
                        success: false,
                        msg: '操作失败'
                    })
                }
                resolve({
                    code: 200,
                    success: true,
                    msg: '续借成功!'
                })
            })
        })
    }
    
}