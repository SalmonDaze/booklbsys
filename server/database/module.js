const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

mongoose.connect('mongodb://localhost:27017/bookSystem', {useNewUrlParser:true})

const userSchema = new Schema({
    username: String,
    password: String,
    UID: Number,
    phone: String,
    token: String,
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
    apply_borrow_list: [{
        apply_item: {
            type: Schema.Types.ObjectId,
            ref: 'tempList'
        },
        apply_book: {
            type: Schema.Types.ObjectId,
            ref: 'book'
        },
        applyTime: {
            type: String
        },
        status: {
            type: String,
            default: 'applying'
        }
    }],
    apply_return_list: [{
        apply_item: {
            type: Schema.Types.ObjectId,
            ref: 'tempList'
        },
        apply_book: {
            type: Schema.Types.ObjectId,
            ref: 'book'
        },
        applyTime: {
            type: String,
        },
        status: {
            type: String,
            default: 'applying'
        }
    }],
    borrow_list: [{
        type: Schema.Types.ObjectId,
        ref: 'book',
    }],
    borrow_history: [{
        book: {
            type: Schema.Types.ObjectId,
            ref: 'book',
        },
        borrowTime: {
            type: String,
            default: ''
        },
        returnTime: {
            type: String,
            default: ''
        },
        isReturn: {
            type: Boolean,
            default: false
        }
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
        borrowUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        borrowTime: {
            type: String,
            default: ''
        },
        returnTime: {
            type: String,
            default: ''
        },
        isReturn: {
            type: Boolean,
            default: false
        }
    }]
})

const tempList = new Schema({
    borrowUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    applyTime: {
        type: String,
        default: ''
    },
    borrowBook: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    state: {
        type: String,
        required: true,
    }
})

const messageList = new Schema({
    title: {
        type: String,
    },
    sendBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sendTo: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        required: true
    },
    create_at: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
})

let Model = {
    user: mongoose.model('user', userSchema),
    book: mongoose.model('book', bookSchema),
    tempList: mongoose.model('tempList', tempList),
    messageList: mongoose.model('messageList', messageList)
}
module.exports = Model