const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const createToken = require('../utils/createToken');
const BadRequest = require('../errors/BadRequest');
exports.signup = asyncHandler(async (req, res, next) => {
    const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    });
    const token = createToken(user._id,req, res);
    res.status(201).json({
        status: 'success',
        token,
        data: user,
  });
})
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new BadRequest(" you should enter email and password", 400));
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password,user.password))) {
         next(new BadRequest(" Incorrect email or password", 400));
    }
    const token = createToken(user._id,req, res);
    res.status(200).json({
        status: "success",
        token
    })

})