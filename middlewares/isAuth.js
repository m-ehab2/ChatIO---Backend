const asyncHandler = require('express-async-handler');
const jwt=require('jsonwebtoken')
const {promisify}=require('util');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unAuthorized');
const isAuth = asyncHandler(async (req, res, next) => {
    
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    
    if (!token) {
        next(new UnauthorizedError(" not found token",401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY)
    const user = await User.findById(decoded.userId);
    if (!user) {
        next(new UnauthorizedError(" the user is not exist",401))
    }
    if (user.changedPasswordAfter(decoded.iat)) {
        return next(
            new UnauthorizedError(
                'User Belong To This Token Recently Changed Password! Please Log In Again',
                401
            )
        );
    }
        req.user = user;
    next()
})
module.exports=isAuth