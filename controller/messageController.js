const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');
const Chat = require('../models/chat');

exports.sendMessage = asyncHandler(async (req, res, next) => {
    const { content, chatId } = req.body;
    let message = await Message.create({
        sender: req.user.id,
        content,
        chat: chatId
    })
    console.log(message)
    message = await Message.populate(message,{ path: 'sender', select: 'name image' })
    console.log(message+"bhbh")
    message = await Message.populate(message, { path: 'chat' })
    console.log(message+"nb")
    message = await User.populate(message, { path: 'chat.users', select: 'name image email' })
    await Chat.findByIdAndUpdate(chatId, {
       latestMessage: message
    })
    console.log(message+"nb")

    res.status(201).json({
        status: "success",
        data: message
    })  
})
exports.getMessages = asyncHandler(async (req, res, next) => {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
        .populate('chat').populate('sender', 'name image email');
    res.status(200).json({
        status: 'success',
        data:messages
    })

})