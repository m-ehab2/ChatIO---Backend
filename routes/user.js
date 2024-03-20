const router = require('express').Router();
const userController = require('../controllers/user');
const isAuth=require('../middlewares/isAuth');
const upload = require('../middlewares/multer');
router.use(isAuth)
router.route('/').get(userController.getUsers).post(userController.createUser)
router.route("/:id").patch(upload.single('image'),userController.updateUser)
    .delete(userController.deleteUser)
    .get(userController.getOneUser)
module.exports=router