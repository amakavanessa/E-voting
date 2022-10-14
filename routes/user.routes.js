const express = require('express');
const User = require('../model/user.model.js');
const auth = require('../controller/authentication.controller');
const middlewares = require('../common/middlewares');
const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
