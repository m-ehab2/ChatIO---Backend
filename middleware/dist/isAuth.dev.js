"use strict";

var asyncHandler = require('express-async-handler');

var AppError = require('../utils/AppError');

var jwt = require('jsonwebtoken');

var _require = require('util'),
    promisify = _require.promisify;

var User = require('../models/user');

var _require2 = require('../controller/userController'),
    getUsers = _require2.getUsers;

var isAuth = asyncHandler(function _callee(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
          } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
          }

          if (!token) {
            next(new AppError(" you are not logged in :please login", 401));
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(promisify(jwt.verify)(token, process.env.SECRET_KEY));

        case 4:
          decoded = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findById(decoded.userId));

        case 7:
          user = _context.sent;

          if (!user) {
            next(new AppError(" the user is not exist", 401));
          }

          if (!user.changedPasswordAfter(decoded.iat)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", next(new AppError('User Belong To This Token Recently Changed Password! Please Log In Again', 401)));

        case 11:
          console.log("ekdhsdj");
          console.log(user);
          req.user = user;
          next();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = isAuth;
//# sourceMappingURL=isAuth.dev.js.map
