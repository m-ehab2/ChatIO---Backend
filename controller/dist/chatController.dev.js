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
exports.createGroup = asyncHandler(function _callee4(req, res, next) {
  var users, chatGroup, group;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          users = JSON.parse(req.body.users);
          console.log(users);

          if (!(users.length < 2)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            status: 'Group should be more than 2'
          }));

        case 4:
          users.push(req.user);
          _context4.next = 7;
          return regeneratorRuntime.awrap(Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
          }));

        case 7:
          chatGroup = _context4.sent;
          _context4.next = 10;
          return regeneratorRuntime.awrap(Chat.findOne({
            _id: chatGroup._id
          }).populate('users', '-password').populate('groupAdmin', '-password'));

        case 10:
          group = _context4.sent;
          res.status(200).json({
            status: 'success',
            data: group
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.renameGroup = asyncHandler(function _callee5(req, res, next) {
  var _req$body, chatId, chatName, newChat;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, chatId = _req$body.chatId, chatName = _req$body.chatName;

          if (!chatId || !chatName) {
            next(new AppError("you should provide chatId and chatName ", 400));
          }

          _context5.next = 4;
          return regeneratorRuntime.awrap(Chat.findByIdAndUpdate(chatId, {
            chatName: chatName
          }, {
            "new": true,
            runValidators: true
          }).populate('users', '-password').populate('groupAdmin', '-password'));

        case 4:
          newChat = _context5.sent;
          res.status(200).json({
            status: 'success',
            data: newChat
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.addUserToGroup = asyncHandler(function _callee6(req, res, next) {
  var _req$body2, chatId, userId, chat;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, chatId = _req$body2.chatId, userId = _req$body2.userId;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Chat.findByIdAndUpdate(chatId, {
            $push: {
              users: userId
            }
          }, {
            runValidators: true,
            "new": true
          }).populate('users', '-password').populate('groupAdmin', '-password'));

        case 3:
          chat = _context6.sent;

          if (!chat) {
            next(new AppError("chatId or userId not found", 400));
          }

          res.status(200).json({
            status: 'success',
            data: chat
          });

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.deleteUserFromGroup = asyncHandler(function _callee7(req, res, next) {
  var _req$body3, chatId, userId, chat;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, chatId = _req$body3.chatId, userId = _req$body3.userId;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Chat.findByIdAndUpdate(chatId, {
            $pull: {
              users: userId
            }
          }, {
            runValidators: true,
            "new": true
          }).populate('users', '-password').populate('groupAdmin', '-password'));

        case 3:
          chat = _context7.sent;

          if (!chat) {
            next(new AppError("chatId or userId not found", 400));
          }

          res.status(200).json({
            status: 'success',
            data: chat
          });

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
//# sourceMappingURL=chatController.dev.js.map
