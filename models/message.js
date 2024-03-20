const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    content: {
        type: String,
    },
    media: {
        type:String,   
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref:'Chat'
    },
    seen: [{
         users: [{
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }],
        seenAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps:true
})
const Message = mongoose.model('Message', MessageSchema);
module.exports=Message