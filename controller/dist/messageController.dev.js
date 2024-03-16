"use strict";

var asyncHandler = require('express-async-handler');

var Message = require('../models/message');

var User = require('../models/user');

var Chat = require('../models/chat');

exports.sendMessage = asyncHandler(function _callee(req, res, next) {
  var _req$body, content, chatId, message;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, content = _req$body.content, chatId = _req$body.chatId;
          _context.next = 3;
          return regeneratorRuntime.awrap(Message.create({
            sender: req.user.id,
            content: content,
            chat: chatId
          }));

        case 3:
          message = _context.sent;
          console.log(message);
          _context.next = 7;
          return regeneratorRuntime.awrap(Message.populate(message, {
            path: 'sender',
            select: 'name image'
          }));

        case 7:
          message = _context.sent;
          console.log(message + "bhbh");
          _context.next = 11;
          return regeneratorRuntime.awrap(Message.populate(message, {
            path: 'chat'
          }));

        case 11:
          message = _context.sent;
          console.log(message + "nb");
          _context.next = 15;
          return regeneratorRuntime.awrap(User.populate(message, {
            path: 'chat.users',
            select: 'name image email'
          }));

        case 15:
          message = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
          }));

        case 18:
          console.log(message + "nb");
          res.status(201).json({
            status: "success",
            data: message
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getMessages = asyncHandler(function _callee2(req, res, next) {
  var chatId, messages;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          chatId = req.params.chatId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Message.find({
            chat: chatId
          }).populate('chat').populate('sender', 'name image email'));

        case 3:
          messages = _context2.sent;
          res.status(200).json({
            status: 'success',
            data: messages
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
//# sourceMappingURL=messageController.dev.js.map
