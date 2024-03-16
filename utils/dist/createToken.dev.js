"use strict";

var jwt = require('jsonwebtoken');

var signToken = function signToken(id) {
  return jwt.sign({
    userId: id
  }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

var createToken = function createToken(id, req, res) {
  var token = signToken(id);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none'
  });
  return token;
};

module.exports = createToken;
//# sourceMappingURL=createToken.dev.js.map
