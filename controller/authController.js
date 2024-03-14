const asyncHandler = require('express-async-handler');
const AppError = require('../utils/AppError');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const createToken = require('../utils/createToken');
exports.signup = asyncHandler(async (req, res, next) => {
    const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    });
    console.log("hello")
    const token = createToken(user._id);
    console.log("token ",token)
    res.status(201).json({
        status: 'success',
        token,
        data: user,
  });
})
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new AppError(" you should enter email and password", 400));
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password,user.password))) {
         next(new AppError(" Incorrect email or password", 401));
    }
    const token = createToken(user._id);
    res.status(200).json({
        status: "success",
        token
    })

})