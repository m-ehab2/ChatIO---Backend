const router = require('express').Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const isAuth=require('../middleware/isAuth')
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

router.route('/').get(isAuth,userController.getUsers).post(userController.createUser)
router.route("/:id").patch(userController.updateUser)
    .delete(isAuth,userController.deleteUser)
    .get(userController.getOneUser)
module.exports=router