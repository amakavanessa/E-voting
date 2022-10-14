const express = require('express');
const Candidate = require('../model/candidate.model.js');
const auth = require('../controller/authentication.controller');
const middlewares = require('../common/middlewares');
const router = express.Router();

router.post(
  '/register-electoral-body',
  middlewares.protect,
  middlewares.restrictTo('superadmin')
  // auth.register()
);

module.exports = router;
