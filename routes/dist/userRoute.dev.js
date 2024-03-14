"use strict";

var router = require('express').Router();

var userController = require('../controller/userController');

var authController = require('../controller/authController');

var isAuth = require('../middleware/isAuth');

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/').get(isAuth, userController.getUsers).post(userController.createUser);
router.route("/:id").patch(userController.updateUser)["delete"](userController.deleteUser).get(userController.getOneUser);
module.exports = router;
//# sourceMappingURL=userRoute.dev.js.map
