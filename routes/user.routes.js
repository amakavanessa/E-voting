const express = require('express');
const User = require('../model/user.model.js');
const auth = require('../controller/authentication.controller');
const catchAsync = require('../common/catch_Async');
const sendSuccessRes = require('../utils/sucessResponse');
const router = express.Router();

router.post(
  '/register',
  catchAsync(async (req, res, next) => {
    const result = req.body;
    let token = await auth.register(User, result);
    sendSuccessRes(result, token, res);
  })
);
router.post(
  '/login',

  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const token = await auth.login(User, email, password);

    if (token) {
      sendSuccessRes(email, token, res);
    }
  })
);

module.exports = router;
