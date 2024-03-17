const BaseError = require("./BaseError");

class NotFound extends BaseError{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
} 
module.exports=NotFound