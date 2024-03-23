const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ userId: id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
const createToken = (id, req, res) => {
  const token = signToken(id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    secure: true,
    sameSite: "none",
  });
  return token;
};

module.exports = createToken;
