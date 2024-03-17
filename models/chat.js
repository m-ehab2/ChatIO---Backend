const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema({
    
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
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
})
    
ChatSchema.virtual("isGroup").get(function () {
    return this.users > 2;
})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;