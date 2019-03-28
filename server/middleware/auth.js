const Model = require('../database/module')

let auth = async (ctx, next) => {
    const authApi = ['/api/applyBorrowBook', '/api/bookBorrowContinue']
    let phone = ctx.header.phone
    let url = authApi.some( url => url === ctx.url )
    if( url ) {
        let anext = await new Promise((resolve, reject) => {
            Model.user.findOne({ phone }).then( doc => {
                if( doc.isBanned ) {
                    resolve({
                        msg: '用户已被封禁',
                        code: 40002,
                        success: false
                    })
                    return
                } else {
                    resolve(next)
                }
            })
            
        })
        if( typeof anext === 'function') {
            await anext()
        } else {
            ctx.body = anext
        }
    } else {
        await next()
    }
    
}

module.exports = auth