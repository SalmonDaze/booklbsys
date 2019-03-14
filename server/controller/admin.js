const Model = require('../database/module')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/default').SECRET
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const upload = require('../utils/upload')
const multer = require('koa-multer')

const l_findAllUser = async () => {
    return new Promise ((resolve, reject) => {
        Model.user.find({}).then( (doc) => {
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
    let { title, author, borrowCycle, cover } = ctx.request.body
    let anext = async function() {
        return new Promise((resolve, reject) => {
            Model.book.create({ title, author, borrowCycle, cover}).then( (doc) => {
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