const User = require("../models/user");
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const uploadMedia = require("../utils/uploadMedia");

exports.getUsers = asyncHandler(async (req, res, next) => {
    const search = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ],
    } : {};

    const users = await User.find(search).find({ _id: { $ne: req.user._id } });
    res.status(200).json({
        status: "success",
        result: users.length,
        data: users
    })
})
exports.getOneUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid user ID format", 400));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new AppError("user not found", 404))
    }
    res.status(200).json({
        status: 'success',
        data: user
    })
})
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        userStatus: req.body.status
    });
    res.status(201).json({
        status: 'success',
        data: user,
    });
})
exports.updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    console.log("sdsdsd")
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid user ID format", 400));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(new AppError("user not found", 404))
    }
    const imageUrl =await uploadMedia(req.file.path);
    console.log(imageUrl.secure_url)
    const newUser = await User.findByIdAndUpdate(id, {
        name: req.body.name,
        status: req.body.status,
        image: imageUrl.secure_url
    }, {
        runValidators: true,
        new: true
    });
        console.log("imageUrl.secure_url ")

    res.status(200).json({
        status: 'success',
        data: newUser
    })
})
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Invalid user ID format", 400));
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return next(new AppError("user not found", 404))

    }
    return res.status(200).json({
        status: "success",
        message: "user is deleted"
    })
})