"use strict";

var asyncHandler = require('express-async-handler');

var AppError = require('../utils/AppError');

var User = require('../models/user');

var jwt = require('jsonwebtoken');

var createToken = require('../utils/createToken');

exports.signup = asyncHandler(function _callee(req, res, next) {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
          }));

        case 2:
          user = _context.sent;
          console.log("hello");
          token = createToken(user._id);
          console.log("token ", token);
          res.status(201).json({
            status: 'success',
            token: token,
            data: user
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.login = asyncHandler(function _callee2(req, res, next) {
  var _req$body, email, password, user, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!email || !password) {
            next(new AppError(" you should enter email and password", 400));
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 10;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(user.correctPassword(password, user.password));

        case 9:
          _context2.t0 = !_context2.sent;

        case 10:
          if (!_context2.t0) {
            _context2.next = 12;
            break;
          }

          next(new AppError(" Incorrect email or password", 401));

        case 12:
          token = createToken(user._id);
          res.status(200).json({
            status: "success",
            token: token
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
//# sourceMappingURL=authController.dev.js.map
