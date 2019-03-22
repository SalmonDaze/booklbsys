const mongoose = require('mongoose')
const Schema = mongoose.Schema
const defaultAvatar = require('../config/default').defaultAvatar
const moment = require('moment')

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
    create_time: {
        type: String,
        default: moment()
    },
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
        type: String,
        default: ''
    },
    borrowUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    returnTime: {
        type: String,
        default: ''
    },
    borrowCount: {
        type: Number,
        default: 0,
        
    },
    bookInfo: {
        type: String,
        default: ''
    },
    borrow_history: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }]
})

let Model = {
    user: mongoose.model('user', userSchema),
    book: mongoose.model('book', bookSchema)
}
module.exports = Model