const express = require('express');
const auth = require('../controller/authentication.controller');
const middlewares = require('../common/middlewares');
const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post(
  '/electoral-body',
  middlewares.protect,
  auth.registerElectoralAdmin
);
module.exports = router;
