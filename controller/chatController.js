
const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat');
const User = require('../models/user');
const AppError = require('../utils/AppError');
exports.accessChat = asyncHandler(async (req, res, next) => {
    console.log("in chat")
    const { userId } = req.body;
    let chatData = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate('message');
    chatData = await User.populate(chatData, {
        path: 'message.sender',
        select:'name image email'
    })
    if (chatData.length>0) {      
        res.status(200).json({
            status: "success",
            data:chatData[0]
        })
    } else {
        var newChat = {
            users: [req.user._id, userId],
            chatName: "sender",
            isGroupChat:false
        }
        const createChat = await Chat.create(newChat);

        const fullChat = await Chat.findOne({ _id: createChat._id })
            .populate("users", "-password");
        if (!fullChat) {
            throw new AppError("the chat not exist",400)
        }
        res.status(201).json({
            status: "success",
            data:fullChat
        })
    }
})
exports.fetchChats = asyncHandler(async (req, res, next) => {
         await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate('users', "-password")
        .populate('groupAdmin', '-password')
        .populate('message')
        .sort({ updatedAt: -1 }).
        then(async(results) => {
            results=await User.populate(results, {
                path: 'message.sender',
                select:'name image email'
            })
            res.status(200).json({
                status: "success",
                data:results
            })
        })
    next(new AppError('not found any chats for that user',400))
    console.log(chats)

})
