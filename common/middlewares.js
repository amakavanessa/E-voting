const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../model/user_model');
const ErrorHandler = require('./error_handler');

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          'You do not have permission to perform this action',
          403
        )
      );
    }
    next();
  };
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new ErrorHandler(
        'You are not logged in! Please log in to get access.',
        401
      )
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  console.log(decoded);
  // // 3) Check if user still exists
  // const currentUser = await User.findById(decoded.id);
  // if (!currentUser) {
  //   return next(
  //     new ErrorHandler(
  //       'The user belonging to this token does no longer exist.',
  //       401
  //     )
  //   );
  // }
  // //check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new ErrorHandler(
  //       'User recently changed password! Please log in again.',
  //       401
  //     )
  //   );
  // }

  // // GRANT ACCESS TO PROTECTED ROUTE
  // req.user = currentUser;
  // res.locals.user = currentUser;

  next();
};
// https://app.getpostman.com/join-team?invite_code=6a5e2766c681596b022f6b18d853185c
