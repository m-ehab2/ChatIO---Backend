"use strict";

var mongoose = require('mongoose');

var db = function db(url) {
  mongoose.connect(url).then(function () {
    return console.log('DB Connected Successfully');
  })["catch"](function (err) {
    return console.log(err);
  });
};

module.exports = db;
//# sourceMappingURL=Database.dev.js.map
