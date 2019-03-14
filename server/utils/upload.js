const multer = require('koa-multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename(ctx, file, cb) {
        let filenameArr = file.originalname.split('.')
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1])
    }
})

let upload = multer({storage: storage})

module.exports = upload