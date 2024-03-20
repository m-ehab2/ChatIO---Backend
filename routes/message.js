const router = require('express').Router();
const messageController=require('../controllers/message');
const isAuth = require('../middlewares/isAuth');
const upload = require('../middlewares/multer');

router.use(isAuth)
router.route('/').post(upload.single("media"),messageController.sendMessage);
router.route('/:chatId').get(messageController.getMessages);
module.exports=router