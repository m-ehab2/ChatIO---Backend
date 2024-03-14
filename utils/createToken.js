const jwt = require('jsonwebtoken');
const createToken =  (id) => {
    return jwt.sign({ userId: id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

module.exports = createToken;