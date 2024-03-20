const router = require('express').Router();

const chatController = require('../controllers/chat');
const isAuth = require('../middlewares/isAuth');
router.use(isAuth);
router.route('/').post(chatController.createChat).get(chatController.fetchChats)
router.route('/:chatId').get(chatController.accessChatByChatId)
router.route('/group').post(chatController.createGroup);
router.route('/group/rename/:chatId').put(chatController.renameGroup);
router.route('/group/add/:chatId').put(chatController.addUserToGroup);
router.route('/group/delete/:chatId').delete(chatController.deleteUserFromGroup);
module.exports = router;