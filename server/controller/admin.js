const Model = require('../database/module')
const jwt = require('jsonwebtoken')
const SECRET = require('../config/default').SECRET
const crypto = require('crypto')

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
        ctx.status = 400
        ctx.body = {
            code: 1,
            success: false,
            msg: '无用户数据',
        }
    }
}
