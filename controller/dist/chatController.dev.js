"use strict";

var asyncHandler = require('express-async-handler');

var Chat = require('../models/chat');

var User = require('../models/user');

var AppError = require('../utils/AppError');

exports.accessChat = asyncHandler(function _callee(req, res, next) {
  var userId, chatData, newChat, createChat, fullChat;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("in chat");
          userId = req.body.userId;
          _context.next = 4;
          return regeneratorRuntime.awrap(Chat.find({
            $and: [{
              users: {
                $elemMatch: {
                  $eq: req.user._id
                }
              }
            }, {
              users: {
                $elemMatch: {
                  $eq: userId
                }
              }
            }]
          }).populate("users", "-password").populate('message'));

        case 4:
          chatData = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.populate(chatData, {
            path: 'message.sender',
            select: 'name image email'
          }));

        case 7:
          chatData = _context.sent;

          if (!(chatData.length > 0)) {
            _context.next = 12;
            break;
          }

          res.status(200).json({
            status: "success",
            data: chatData[0]
          });
          _context.next = 22;
          break;

        case 12:
          newChat = {
            users: [req.user._id, userId],
            chatName: "sender",
            isGroupChat: false
          };
          _context.next = 15;
          return regeneratorRuntime.awrap(Chat.create(newChat));

        case 15:
          createChat = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(Chat.findOne({
            _id: createChat._id
          }).populate("users", "-password"));

        case 18:
          fullChat = _context.sent;

          if (fullChat) {
            _context.next = 21;
            break;
          }

          throw new AppError("the chat not exist", 400);

        case 21:
          res.status(201).json({
            status: "success",
            data: fullChat
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
});
//# sourceMappingURL=chatController.dev.js.map
