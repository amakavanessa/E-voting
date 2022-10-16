const express = require('express');
const User = require('../model/user.model.js');
const Candidate = require('../model/candidate.model.js');
const auth = require('../controller/authentication.controller');
const superadmin = require('../controller/superadmin.controller');

const middlewares = require('../common/middlewares');
const router = express.Router();

router.use(middlewares.protect, middlewares.restrictTo('superadmin'));

// router.post(
//   '/register-electoral-body',
// );

router.get('/list-of-all-users', superadmin.getAll(User));
router
  .route('/:id')
  .get(superadmin.getOne(User))
  .patch(superadmin.updateOne(User))
  .delete(superadmin.deleteOne(User));

module.exports = router;
