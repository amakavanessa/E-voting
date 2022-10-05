const User = require('../model/user_model.js');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../common/error_handler');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.registerElectoralAdmin = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'I am protected',
  });
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new ErrorHandler('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new ErrorHandler('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
      message: 'logged in successfully',
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};
