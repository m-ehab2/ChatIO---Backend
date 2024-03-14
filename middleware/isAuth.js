const asyncHandler = require('express-async-handler');
const AppError = require('../utils/AppError');
const jwt=require('jsonwebtoken')
const {promisify}=require('util');
const User = require('../models/user');
const isAuth =asyncHandler( async (req, res, next) => {
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        next(new AppError(" you are not logged in :please login",401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
    const user = await User.findById(decoded.id);
    if (!user) {
        next(new AppError(" the user is not exist",401))
    }
    if (user.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User Belong To This Token Recently Changed Password! Please Log In Again',
                401
            )
        );
    }
        req.user = user;
    next()
})
module.exports=isAuth