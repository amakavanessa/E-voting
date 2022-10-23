const express = require('express');
const User = require('../model/user.model.js');
const ElectoralBody = require('../model/electoral_body.model');
const auth = require('../controller/authentication.controller');
const superadmin = require('../controller/superadmin.controller');
const catchAsync = require('../common/catch_Async');
const successRes = require('../utils/sucessResponse');
const middlewares = require('../common/middlewares');
const router = express.Router();

router.use(middlewares.protect, middlewares.restrictTo('superadmin'));

router.post(
  '/electoral-body',
  catchAsync(async (req, res, next) => {
    const result = req.body;
    let token = await auth.register(ElectoralBody, result);
    successRes(result, token, res);
  })
);
router.get(
  '/list-of-all-users',
  catchAsync(async (req, res, next) => {
    const query = req.query;
    const users = await superadmin.getAll(User, query);

    successRes(users.length, users, res);
  })
);
router
  .route('/:id')
  .get(
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const user = await superadmin.getOne(User, id);
      successRes(user, null, res);
    })
  )
  .patch(
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const data = req.body;
      const user = await superadmin.updateOne(User, id, data);
      successRes(user, null, res);
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      await superadmin.deleteOne(User, id);
      successRes('', '', res);
    })
  );

module.exports = router;
