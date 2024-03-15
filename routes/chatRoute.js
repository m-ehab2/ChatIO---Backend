const router = require('express').Router();

const chatController = require('../controller/chatController');
const isAuth = require('../middleware/isAuth');

router.route('/').post(isAuth,chatController.accessChat)

module.exports = router;