const express = require('express');
const User = require('../model/user.model.js');
const auth = require('../controller/authentication.controller');
const middlewares = require('../common/middlewares');
const router = express.Router();

router.post('/register', (req, res) => {
  let user = req.body;
  auth.register(User, user, res);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let token = await auth.login(email, password);
  console.log(token);
  return res.status(200).json({
    status: 'success',
    token,
    email,
  });
});

module.exports = router;
