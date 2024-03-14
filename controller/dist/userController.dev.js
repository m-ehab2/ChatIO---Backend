"use strict";

var User = require("../models/user");

var asyncHandler = require('express-async-handler');

var AppError = require('../utils/AppError');

var mongoose = require("mongoose");

exports.getUsers = asyncHandler(function _callee(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;
          res.status(200).json({
            status: "success",
            result: users.length,
            data: users
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getOneUser = asyncHandler(function _callee2(req, res, next) {
  var id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new AppError("Invalid user ID format", 400)));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", next(new AppError("user not found", 404)));

        case 8:
          res.status(200).json({
            status: 'success',
            data: user
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createUser = asyncHandler(function _callee3(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
          }));

        case 2:
          user = _context3.sent;
          res.status(201).json({
            status: 'success',
            data: user
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.updateUser = asyncHandler(function _callee4(req, res, next) {
  var id, user, newUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", next(new AppError("Invalid user ID format", 400)));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          user = _context4.sent;

          if (user) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", next(new AppError("user not found", 404)));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            "new": true
          }));

        case 10:
          newUser = _context4.sent;
          res.status(200).json({
            status: 'success',
            data: newUser
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.deleteUser = asyncHandler(function _callee5(req, res, next) {
  var id, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;

          if (mongoose.Types.ObjectId.isValid(id)) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", next(new AppError("Invalid user ID format", 400)));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(id));

        case 5:
          user = _context5.sent;

          if (user) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", next(new AppError("user not found", 404)));

        case 8:
          return _context5.abrupt("return", res.status(200).json({
            status: "succes",
            message: "user is deleted"
          }));

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=userController.dev.js.map
