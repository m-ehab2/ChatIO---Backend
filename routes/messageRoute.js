const router = require('express').Router();
const messageController=require('../controller/messageController');
const isAuth = require('../middleware/isAuth');
router.route('/').post(isAuth,messageController.sendMessage);
router.route('/:chatId').get(isAuth,messageController.getMessages);
module.exports=router