const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema({
    isGroupChat: {
        type: Boolean,
        default:false
    },
    chatName: {
        type:String
    },
    groupAdmin: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }
    ,
    users: [
        {
            type:mongoose.Schema.ObjectId,
            ref: 'User',
        },
    ],
    message: {
        type: String,
        ref:'Message'
    }
}, {
    timestamps:true
})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;