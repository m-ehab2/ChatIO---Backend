"use strict";

var router = require('express').Router();

var chatController = require('../controller/chatController');

var isAuth = require('../middleware/isAuth');

router.route('/').post(isAuth, chatController.accessChat).get(isAuth, chatController.fetchChats);
module.exports = router;
//# sourceMappingURL=chatRoute.dev.js.map
