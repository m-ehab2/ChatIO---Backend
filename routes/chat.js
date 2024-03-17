const router = require('express').Router();

const chatController = require('../controllers/chat');
const isAuth = require('../middlewares/isAuth');
router.use(isAuth);
router.route('/').post(chatController.accessChat).get(chatController.fetchChats);
router.route('/group').post(chatController.createGroup);
router.route('/group/rename').put(chatController.renameGroup);
router.route('/group/add').put(chatController.addUserToGroup);
router.route('/group/delete').delete(chatController.deleteUserFromGroup);
module.exports = router;