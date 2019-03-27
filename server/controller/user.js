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
            cogde: 1,
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
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.user.findOne({phone}).populate({path: 'borrow_list'}).exec((err, doc) => {
                if(err) {
                    resolve({
                        success: false,
                        code: 1,
                        msg: '登陆错误'
                    })
                }
                const phoneReg = /^1[0-9]{10}$/
                if( !doc || !phoneReg.test(phone)) {
                    resolve({
                        success: false,
                        code: 1,
                        msg: '用户名或者密码错误'
                    })
                }
                let tempPassword = dpPwd(doc.password, SECRET)
                if( tempPassword !== password ) {
                    resolve({
                        success: false,
                        code: 1,
                        msg: '手机号或者密码错误！'
                    })
                }
                if( tempPassword === password ) {
                    let token = jwt.sign({phone: phone}, SECRET, {
                        expiresIn : '10d'// 授权时效24小时
                    });
                    doc.token = token
                    doc.save()
                    resolve({
                        code: 200,
                        success: true,
                        token: token,
                        msg: '登陆成功！',
                        user: doc
                    })
                }
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.loginByToken = async (ctx) => {
    let { phone, token} = ctx.request.body
    console.log(phone, token)
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.user.findOne({ phone }).then( (doc) => {
                console.log(doc)
                if( doc.token === token) {
                    resolve({
                        msg: '登录成功',
                        success: true,
                        code: 200,
                        data: doc
                    })
                } else {
                    resolve({
                        msg: '登录失败',
                        success: false,
                        code: 1,
                    })
                }
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.getAllBook = async (ctx) => {
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.book.find({}).populate({path: 'borrowUser'}).exec((err, doc) => {
                if(err) {
                    resolve({
                        code: 1,
                        success: false,
                        msg: '查询失败'
                    })
                }
                resolve({
                    code: 200,
                    success: true,
                    msg: '查询成功',
                    data: doc,
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.borrowBook = async (ctx) => {
    let { _id, phone, _userId } = ctx.request.body
    const { borrowCycle } = await l_findBook(_id)
    let anext = async () => {
        return new Promise((resolve, reject ) => {
            if ( !_id || !phone || !_userId) {
                resolve({
                    code: 1,
                    success: false,
                    msg: '操作失败'
                })
            }
            Model.book.findOne({ _id }).then( bookdoc => {
                bookdoc.isLending = true
                bookdoc.borrowTime = moment().format('YYYY-MM-DD HH:mm:ss')
                bookdoc.borrowUser = _userId,
                bookdoc.returnTime = moment().add(borrowCycle, 'days').format('YYYY-MM-DD HH:mm:ss')
                bookdoc.borrowCount += 1
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
                        return
                    }
                    doc.borrow_list.push(_id)
                    doc.borrow_history.push({
                        book: bookdoc._id,
                        borrowTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                        returnTime: moment().add(borrowCycle, 'days').format('YYYY-MM-DD HH:mm:ss'),
                        isReturn: false,
                    })
                    bookdoc.borrow_history.push({
                        borrowUser: doc._id,
                        borrowTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                        returnTime: moment().add(borrowCycle, 'days').format('YYYY-MM-DD HH:mm:ss'),
                        isReturn: false
                    })
                    doc.save()
                    bookdoc.save()
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

module.exports.applyBorrowBook = async ( ctx ) => {
    let { _id, _userId } = ctx.request.body
    let anext = async () => {
        return new Promise( (resolve, reject) => {
                Model.user.findOne({_id: _userId}).then( doc => {
                    let isApplying = doc.apply_borrow_list.some( ( book ) => {
                        return ( String(book.apply_book) === String(_id) && book.status === 'applying' )
                    })
                    if( isApplying ) {
                        resolve({
                            code: 1,
                            msg: '不可重复申请',
                            success: false
                        })
                        return
                    }
                    Model.book.findOne({ _id }).then( bookdoc => {
                        console.log(bookdoc)
                        if( bookdoc.isLending ) {
                            resolve({
                                msg: '该书已被借阅',
                                success: false,
                                code: 1,
                            })
                            return
                        }
                    })
                    Model.tempList.create({
                        borrowBook: _id,
                        borrowUser: _userId,
                        applyTime: moment().format('YYYY-MM-DD HH:mm:ss')
                    }).then( applydoc => {
                        doc.apply_borrow_list.push({
                            apply_item: applydoc._id,
                            apply_book: _id
                        })
                        doc.save()
                        resolve({
                            code: 200,
                            msg: '申请成功',
                            success: true,
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
    let { time, _id, _userId } = ctx.request.body
    let { returnTime } = await l_findBook(_id)
    let anext = async () => {
        return new Promise( (resolve, reject) => {
            Model.book.findOne({ _id }).then( doc => {
                let returnTime = moment(doc.returnTime).add(time, 'days').format('YYYY-MM-DD HH:mm:ss')
                if( moment(returnTime).diff(doc.borrowTime, 'days') > 90) {
                    resolve({
                        msg: '最多只能借阅90天',
                        success: false,
                        code: 1
                    })
                }
                doc.returnTime = returnTime
                Model.user.findOne({ _id: _userId }).then( userdoc => {
                    for(const item of userdoc.borrow_history ) {
                        if( item.borrowTime === doc.borrowTime ) {
                            item.returnTime = moment(item.returnTime).add(time, 'days').format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                    for(const item of doc.borrow_history ) {
                        if( item.borrowTime === doc.borrowTime ) {
                            item.returnTime = moment(item.returnTime).add(time, 'days').format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                    userdoc.save()
                    doc.save()
                })
                
                resolve({
                    msg: '续借成功',
                    code: 200,
                    success: true
                })
            })
        })
    }
    let result = await anext()
    ctx.body = result
}

module.exports.returnBook = async (ctx) => {
    let { _id, _userId } = ctx.request.body
    let anext = async () => {
        return new Promise ( (resolve, reject ) => {
            Model.book.findOne({ _id }).then( doc => {
                let borrowTime = doc.borrowTime
                doc.isLending = false
                doc.borrowTime = ''
                doc.returnTime = ''
                doc.borrowUser = null
                for( const item of doc.borrow_history) {
                    if( item.borrowTime === borrowTime ) {
                        item.returnTime = moment().format('YYYY-MM-DD HH:mm:ss')
                        item.isReturn = true
                    }
                }
                Model.user.findOne({ _id: _userId}).then( user => {
                    user.borrow_list.splice(user.borrow_list.indexOf( _id ), 1)
                    for(const item of user.borrow_history) {
                        if ( item.borrowTime === borrowTime ) {
                            item.returnTime = moment().format('YYYY-MM-DD HH:mm:ss')
                            item.isReturn = true
                        }
                    }
                    user.save()
                })
                doc.save()
                resolve({
                    success: true,
                    code: 200,
                    msg: '归还成功！'
                })
            })
        })
    }
    let result = await anext()
    ctx.body = result
}

module.exports.getHotBook = async (ctx) => {
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.book.find({}).then((doc) => {
                let newArr = new Array()
                let min = doc[0].borrowCount
                let length = doc.length < 12 ? doc.length : 12
                for(let i = 0 ; i < length ; i++) {
                    newArr.push(doc[i])
                    if( doc[i].borrowCount < min ) {
                        min = doc[i].borrowBook
                    }
                }
                if( length > 12 ) {
                    for( let j = 12 ; j < length ; j++) {
                        if (doc[j].borrowCount > min) {
                            min = doc[j].borrowBook
                            let index = newArr.findIndex( x => x.borrowBook === min )
                            newArr[index] = doc[j]
                        }
                    }
                }
                resolve(newArr)
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = {
        msg:'查询成功',
        success: true,
        code: 200,
        data: result
    }
}

module.exports.getNewBook = async (ctx) => {
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.book.find({}).sort({'create_time': -1}).limit(12).exec((err, doc) => {
                if (err) {
                    resolve({
                        code: 1,
                        msg: '查询失败',
                        success: false,
                    })
                }
                resolve({
                    code: 200,
                    msg: '查询成功',
                    success: true,
                    data: doc
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.getUserBorrowList = async (ctx) => {
    let { _id } = ctx.request.body
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.user.findOne({ _id }).populate({path: 'borrow_list'}).exec((err, doc) => {
                resolve({
                    msg: '查询成功',
                    success: true,
                    code: 200,
                    data: doc
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.getOneBookInfo = async (ctx) => {
    let { _id } = ctx.request.body
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.book.findOne({_id}).populate('borrow_history.borrowUser').exec( (err, doc) => {
                resolve({
                    msg: '查询成功',
                    code: 200,
                    data: doc,
                    success: true
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.cancelApply = async (ctx) => {
    let { _id } = ctx.request.body
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.tempList.findOne({ _id }).then( tempdoc => {
                Model.user.findOne({ _id: tempdoc.borrowUser}).then( userdoc => {
                    for(const index in userdoc.apply_borrow_list) {
                        console.log(String(userdoc.apply_borrow_list[index].apply_item) == String(_id))
                        if(String(userdoc.apply_borrow_list[index].apply_item) == String(_id)){
                            console.log(index)
                            userdoc.apply_borrow_list.splice(index, 1)
                        }
                    }
                    userdoc.save()
                    tempdoc.remove().exec()
                })
            })
            resolve({
                msg: '删除成功',
                success: true,
                code: 200
            })
        })
    }
    let result = await anext()
    ctx.statsu = 200
    ctx.body = result
}
