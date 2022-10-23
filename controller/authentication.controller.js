const User = require('../model/user.model.js');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errorController/error_handler');
const AuthError = require('../errorController/auth.error');
const catchAsync = require('../common/catch_Async');
const createSendToken = (data) => {
  return jwt.sign(JSON.parse(JSON.stringify(data)), process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (model, result, next) => {
  const register = await model.create(result);
  if (!register) {
    return AuthError('not registred');
  }
  return createSendToken(register);
};

exports.login = async (model, email, password) => {
  // 1) Check if email and password exist
  if (!email || !password) {
    throw new AuthError('Please provide email and password!');
  }
  // 2) Check if user exists && password is correct
  const login = await model.findOne({ email }).select('+password');

  if (!login || !(await login.correctPassword(password, login.password))) {
    throw new AuthError('Incorrect email or password');
  }

  // 3) If everything ok, send token to client
  return createSendToken(login);
};
