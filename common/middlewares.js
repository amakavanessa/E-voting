const app = require('./../app');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/user.model');
const catchAsync = require('../common/catch_Async');
const ErrorHandler = require('../errorController/error_handler');

exports.restrictTo = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorHandler('You dont have permission.', 401);
    }
    next();
  };
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    throw new ErrorHandler(
      'You are not logged in! Please log in to get access.',
      401
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists

  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    throw new ErrorHandler(
      'The user belonging to this token does no longer exist.',
      401
    );
  }
  //check if user changed password after the token was issued

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  // res.locals = decoded;
  res.locals = decoded;

  // console.log(currentUser);

  next();
});
