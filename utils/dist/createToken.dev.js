"use strict";

var jwt = require('jsonwebtoken');

var createToken = function createToken(id) {
  return jwt.sign({
    userId: id
  }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

module.exports = createToken;
//# sourceMappingURL=createToken.dev.js.map
