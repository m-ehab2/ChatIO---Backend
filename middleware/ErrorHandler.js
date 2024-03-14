const AppError = require("../utils/AppError");

const ErrorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        console.log(err)
        console.log(AppError)
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
        });
    }
    if (err.name === 'ValidationError') {
        console.log(err)
        const errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).json({
            status: 'fail',
            message: errorMessage,
        });
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
        const duplicateKey = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            status: 'fail',
            message: `The ${duplicateKey} is already taken.`,
        });
    }
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            status: 'fail',
            message: "Invalid token. Please log in again.",
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'fail',
            message: "Token is expired. Please log in again.",
        });
    }
    // Handle route not found error
    if (err.status === 404) {
        return res.status(404).json({
            status: 'fail',
            message: `Cannot find ${req.originalUrl} on this server.`,
        });
    }
    // Handle other unexpected errors
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
};

module.exports = ErrorHandler;
