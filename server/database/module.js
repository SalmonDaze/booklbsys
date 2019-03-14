const mongoose = require('mongoose')
const Schema = mongoose.Schema
const defaultAvatar = require('../config/default').defaultAvatar

mongoose.connect('mongodb://localhost:27017/bookSystem', {useNewUrlParser:true})

const userSchema = new Schema({
    username: String,
    password: String,
    UID: Number,
    phone: String,
    create_at: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    avatar_key: {
        type: String,
        default: 'defaultAvatar'
    },
    borrow_list: [{
        type: Schema.Types.ObjectId,
        ref: 'book',
    }]
})

const bookSchema = new Schema({
    title: {
        type: String,
        default: '书'
    },
    author: {
        type: String,
        default: 'admin'
    },
    cover: {
        type: String,
        default: ''
    },
    borrowCycle: {
        type: String,
        default: '7'
    },
    isLending: {
        type: Boolean,
        default: false,
    },
    borrowTime: {
        type: Date,
        default: ''
    },
    borrowUser: {
        type: Schema.Types.String,
        ref: 'user',
    }
})

let Model = {
    user: mongoose.model('user', userSchema),
    book: mongoose.model('book', bookSchema)
}
module.exports = Model