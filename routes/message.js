const router = require('express').Router();
const messageController=require('../controllers/message');
const isAuth = require('../middlewares/isAuth');
router.use(isAuth)
router.route('/').post(messageController.sendMessage);
router.route('/:chatId').get(messageController.getMessages);
module.exports=router