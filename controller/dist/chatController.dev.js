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
exports.fetchChats = asyncHandler(function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Chat.find({
            users: {
              $elemMatch: {
                $eq: req.user._id
              }
            }
          }).populate('users', "-password").populate('groupAdmin', '-password').populate('message').sort({
            updatedAt: -1
          }).then(function _callee2(results) {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(User.populate(results, {
                      path: 'message.sender',
                      select: 'name image email'
                    }));

                  case 2:
                    results = _context2.sent;
                    res.status(200).json({
                      status: "success",
                      data: results
                    });

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 2:
          next(new AppError('not found any chats for that user', 400));
          console.log(chats);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
//# sourceMappingURL=chatController.dev.js.map
