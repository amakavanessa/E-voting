const jwt = require('jsonwebtoken');
const signToken = (data) => {
  return jwt.sign(JSON.parse(JSON.stringify(data)), process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user) => {
  return signToken(user);
};

module.exports = createSendToken;
//   res.cookie('jwt', token, {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   });
