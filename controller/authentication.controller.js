const User = require('../model/user.model.js');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../common/error_handler');
const catchAsync = require('../common/catch_Async');
const signToken = (data) => {
  return jwt.sign(JSON.parse(JSON.stringify(data)), process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const register = await User.create(req.body);
  createSendToken(register, 201, req, res);
  if (!register) {
    return next(new ErrorHandler('heyyy', 400));
  }
});

exports.registerElectoralAdmin = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'I am protected',
    });
  } catch (err) {
    return next(
      new ErrorHandler('You do not have permission to perform this action', 403)
    );
  }
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new ErrorHandler('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const login = await User.findOne({ email }).select('+password');

  if (!login || !(await login.correctPassword(password, login.password))) {
    return next(new ErrorHandler('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(login, 201, req, res);
});
