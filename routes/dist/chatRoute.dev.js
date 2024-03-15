"use strict";

var router = require('express').Router();

var chatController = require('../controller/chatController');

var isAuth = require('../middleware/isAuth');

router.route('/').post(isAuth, chatController.accessChat).get(isAuth, chatController.fetchChats);
router.route('/group').post(isAuth, chatController.createGroup);
router.route('/group/rename').put(isAuth, chatController.renameGroup);
module.exports = router;
//# sourceMappingURL=chatRoute.dev.js.map
