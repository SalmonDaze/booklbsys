const Model = require('../database/module')

const l_findUser = async (username) => {
    return new Promise((resolve, reject) => {
        Model.user.findOne({username: username}).then( (doc) => {
            resolve(doc)
        })
    })
}

module.exports.registry = async (ctx) => {
    let doc = await l_findUser('salmon')
    if( doc ) {
        ctx.status = 200
        ctx.body = {
            success: false,
            msg: '用户已被注册！'
        }
    }else {
        await Model.user.create({username: 'salmon', password: '123'}).then(() => {
            ctx.status = 200
            ctx.body = {
                success: false,
                msg: '注册成功！'
            }
        })
    }
}