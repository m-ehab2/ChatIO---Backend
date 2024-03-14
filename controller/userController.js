const User = require("../models/user");
const asyncHandler = require('express-async-handler');
const AppError=require('../utils/AppError');
const mongoose = require("mongoose");
    
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        result: users.length,
        data:users
    })
})
exports.getOneUser =asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid user ID format", 400));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new AppError("user not found",404))
    }
    res.status(200).json({
        status: 'success',
        data:user
    })
})
exports.createUser =asyncHandler( async (req,res,next) => {
    const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
    status: 'success',
    data: user,
  });
})
exports.updateUser =asyncHandler( async(req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid user ID format", 400));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new AppError("user not found",404))
    }
    const newUser = await User.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new:true
    })
    res.status(200).json({
        status: 'success',
        data:newUser
    })
})
exports.deleteUser = asyncHandler(async (req,res,next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid user ID format", 400));
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return next(new AppError("user not found",404))

    }
    return res.status(200).json({
            status: "succes",
            message:"user is deleted"
        })
})