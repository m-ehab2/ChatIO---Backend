const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');
const Chat = require('../models/chat');

exports.sendMessage = asyncHandler(async (req, res, next) => {
    const { content, chatId } = req.body;
    let newMessage = await Message.create({
        sender: req.user.id,
        content,
        chat: chatId
    })
    newMessage = await Message.populate(newMessage,{ path: 'sender', select: 'name image' })
    newMessage = await Message.populate(newMessage, { path: 'chat' })
    newMessage = await User.populate(newMessage, { path: 'chat.users', select: 'name image email' })
    await Chat.findByIdAndUpdate(chatId, {
       message: newMessage._id
    })

    res.status(201).json({
        status: "success",
        data: newMessage
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