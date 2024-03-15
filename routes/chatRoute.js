const router = require('express').Router();

const chatController = require('../controller/chatController');
const isAuth = require('../middleware/isAuth');

router.route('/').post(isAuth,chatController.accessChat).get(isAuth,chatController.fetchChats);
router.route('/group').post(isAuth,chatController.createGroup);
module.exports = router;