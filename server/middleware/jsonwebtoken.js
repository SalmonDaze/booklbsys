const jwt = require('jsonwebtoken')
const config = require('../config/default')
let jsonwebtoken = async (ctx, next) => {
    const authUrl = ['/api/login', '/api/register', '/api/loginByToken']
    let token = ctx.header.accesstoken
    let url = authUrl.find( url => url === ctx.url)
    if( url ) {
        await next()
    } else {
        let anext = await new Promise((resolve, reject) => {
            jwt.verify(token, config.SECRET, async (err, decoded) => {
                if( err ) {
                    resolve({
                        code: 40001,
                        msg: 'token已失效'
                    })
                }else {
                    resolve(next)
                }
            })
        })
        if( typeof anext === 'function') {
            await anext()
        } else {
            ctx.body = anext
        }
    }
}

module.exports = jsonwebtoken
