const Model = require('../database/module')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/default').SECRET
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const upload = require('../utils/upload')
const multer = require('koa-multer')
const moment = require('moment')

const l_findAllUser = async () => {
    return new Promise ((resolve, reject) => {
        Model.user.find({}).then( (doc) => {
            resolve(doc)
        })
    })
}

const l_findUserByPhone = async (phone) => {
    return new Promise ((resolve, reject ) => {
        Model.user.find({phone}).then( (doc) => {
            resolve(doc)
        })
    })
}

const l_findAllBook = async () => {
    return new Promise ((resolve, reject) => {
        Model.book.find({}).then( (doc) => {
            resolve(doc)
        })
    })
}

module.exports.userInfoCheck = async (ctx, next) => {
    let result = await l_findAllUser()
    if ( result ) {
        ctx.status = 200
        ctx.body = {
            code: 200,
            success: true,
            msg: '查找成功！',
            data: result
        }
    } else {
        ctx.status = 200
        ctx.body = {
            code: 1,
            success: false,
            msg: '无用户数据',
        }
    }
}

module.exports.uploadCover = async (ctx, next) => {
    let { path } = ctx.req.file
    ctx.body = {
        code: 200,
        success: true,
        msg: '上传成功',
        path: path
    }
}

module.exports.uploadBook = async (ctx, next) => {
    let { title, author, borrowCycle, cover, bookInfo } = ctx.request.body
    let anext = async function() {
        return new Promise((resolve, reject) => {
            Model.book.create({ title, author, borrowCycle, cover, create_time: moment().format('YYYY-MM-DD HH:mm:ss'), bookInfo}).then( (doc) => {
                if (!doc) {
                    resolve({
                        code: 1,
                        success: false,
                        msg: '上传失败'
                    })
                } else {
                    resolve({
                        code: 200,
                        success: true,
                        msg: '上传成功'
                    })
                }
            })
        })
    }

    let result = await anext()
    ctx.body = result
}

module.exports.banUser = async (ctx) => {
    let { phone } = ctx.request.body
    let doc = await l_findUserByPhone(phone)
    let anext = async () => {
        return new Promise ((resolve, reject) => {
            Model.user.updateOne({phone: phone}, {isBanned: true}, (err, doc) => {
                if(err) {
                    resolve({
                        code: 1,
                        success: false,
                        msg: '操作失败'
                    })
                }
                resolve({
                    code: 200,
                    msg: '封禁成功！',
                    success: true
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.unBanUser = async (ctx) => {
    let { phone } = ctx.request.body
    let anext = async () => {
        return new Promise( (resolve, reject) => {
            Model.user.updateOne({ phone: phone }, {isBanned: false}, (err, doc) => {
                if(err) {
                    resolve({
                        code: 1,
                        success: false,
                        msg: '操作失败'
                    })
                }
                resolve({
                    code: 200,
                    msg: '解除封禁成功！',
                    success: true,
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.getUserInfo = async (ctx) => {
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.user.find({}).populate({path: 'borrow_list'}).exec((err, doc) => {
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
                    data: doc
                })
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
                console.log(err, doc)
                if (err) {
                    resolve({
                        msg: '查询失败',
                        code: 1,
                        success: false
                    })
                }
                resolve({
                    msg: '查询成功',
                    code: 200,
                    success: true,
                    data: doc
                })
            })
        })
    }
    let result = await anext()
    console.log(result)
    ctx.body = result
}

module.exports.sevenDaysExpire = async (ctx) => {
    let bookList = await l_findAllBook()
    let returnList = new Array()
    for(const book of bookList) {
        if( book.isLending) {
            let start = book.borrowTime
            let end = book.returnTime
            if( moment(end).diff(start, 'days') <= 7 ) {
                returnList.push(book)
            }
        }
    }
    ctx.status = 200
    ctx.body = {
        msg: '查询成功',
        code: 200,
        success: true,
        data: returnList
    }
}

module.exports.sevenDaysBorrow = async (ctx) => {
    let books = await l_findAllBook()
    let getDoc = async (_id) => {
        return new Promise((resolve, reject) => {
            Model.book.findOne({ _id }).populate({path: 'borrowUser'}).exec((err, doc) => {
                resolve(doc)
            })
        })
    }
    let anext = async () => {
        return new Promise(async (resolve, reject) => {
            let bookList = new Array()
            for(const book of books) {
                if( book.isLending ) {
                    let start = book.borrowTime
                    console.log(moment().diff(start, 'days'), start)
                    if( moment().diff(start, 'days') <= 7) {
                        let doc = await getDoc(book._id)
                        bookList.push(doc)
                    }
                }
            }
            resolve(bookList)
        })
    }
    let bookList = await anext()
    ctx.status = 200
    ctx.body = {
        msg: '查询成功',
        code: 200,
        success: true,
        data: bookList
    }
}

module.exports.deleteBook = async (ctx) => {
    let { _id } = ctx.request.body
    let anext = async () => {
        return new Promise( (resolve, reject) => {
            Model.book.deleteOne({ _id }, (err) => {
                if(err) {
                    resolve({
                        msg: '操作失败',
                        code: 1,
                        success: false
                    })
                }
                resolve({
                    msg: '删除成功',
                    code: 200,
                    success: true
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.getDelayList = async (ctx) => {
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.book.find({}).populate({path: 'borrowUser'}).exec((err, doc) => {
                let bookList = new Array()
                for( const book of doc ) {
                    if( book.isLending ) {
                        if( moment().diff(book.returnTime, 'days') >= 0){
                            bookList.push(book)
                        }
                    }
                }
                resolve({
                    msg: '查询成功！',
                    code: 200,
                    data: bookList,
                    success: true
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.delaingBookList = async (ctx) => {
    let anext= async () => {
        return new Promise((resolve, reject) => {
            Model.book.find({}).populate({path:'borrowUser'}).exec( (err, doc) => {
                let bookList = new Array()
                for(const book of doc ){
                   
                    if( book.isLending ) {
                        if(moment(book.returnTime).diff(moment(), 'days') <= 7) {
                            bookList.push(book)
                        }
                    }
                }
                resolve({
                    msg: '查询成功！',
                    code: 200,
                    success: true,
                    data: bookList
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}

module.exports.unReturnBookList = async (ctx) => {
    let anext = async () => {
        return new Promise((resolve, reject) => {
            Model.book.find({}).populate({path: 'borrowUser'}).exec((err, doc) => {
                let bookList = new Array()
                for(const book of doc) {
                    if (book.isLending) {
                        bookList.push(book)
                    }
                }
                resolve({
                    msg: '查询成功',
                    code: 200,
                    success: true,
                    data: bookList
                })
            })
        })
    }
    let result = await anext()
    ctx.status = 200
    ctx.body = result
}