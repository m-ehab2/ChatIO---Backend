"use strict";

var validator = require('validator');

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"]
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    validate: [validator.isEmail, 'Please Enter a Valid Email']
  },
  password: {
    type: String,
    required: [true, 'please enter Password'],
    minlength: [8, "please enter more than or equal 8 chars"]
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function validator(val) {
        return val == this.password;
      },
      message: "the password not the same"
    }
  },
  passwordChangedAt: Date
}, {
  timestamps: true
});
UserSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified('password')) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 12));

        case 4:
          this.password = _context.sent;
          this.passwordConfirm = undefined;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

UserSchema.methods.correctPassword = function _callee2(password, userPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(password, userPassword));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

UserSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    var timePasswordChanged = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimeStamp < timePasswordChanged;
  }

  return false;
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
//# sourceMappingURL=user.dev.js.map
