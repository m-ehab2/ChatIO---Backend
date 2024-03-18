const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    content: {
        type: String,
        required:true
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref:'Chat'
    },
    seen: {
        type: Boolean,
        default:false
    }
}, {
    timestamps:true
})
const Message = mongoose.model('Message', MessageSchema);
module.exports=Message