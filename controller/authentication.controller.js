const User = require('../model/user.model.js');

const AuthError = require('../errorController/auth.error');
const catchAsync = require('../common/catch_Async');
const createSendToken = require('../utils/createToken');
exports.register = catchAsync(async (model, result, res) => {
  register = await model.create(result);
  createSendToken(register, res);
  if (!register) {
    throw new AuthError('User was not created! try again');
  }
});

exports.login = catchAsync(async (email, password) => {
  // const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    throw new AuthError('Please provide email and password!', 400);
  }
  // 2) Check if user exists && password is correct
  const login = await User.findOne({ email }).select('+password');

  if (!login || !(await login.correctPassword(password, login.password))) {
    throw new AuthError('Incorrect email or password');
  }

  let token = await createSendToken(login);
  return token;
});
