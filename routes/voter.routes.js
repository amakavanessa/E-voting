const express = require('express');
const handler = require('../controller/handler.controller');
const Voter = require('../model/voter.model');
const voter = require('../controller/voter.controller');
const catchAsync = require('../common/catch_Async');
const successRes = require('../utils/successResponse');
const middlewares = require('../common/middlewares');

const router = express.Router({ mergeParams: true });

router.use(middlewares.protect, middlewares.restrictTo('superadmin'));

router
  .route('/')
  .get(
    catchAsync(async (req, res, next) => {
      const query = req.query;
      const voters = await handler.getAll(Voter, query);

      successRes(voters.length, voters, res);
    })
  )
  .post(
    catchAsync(async (req, res, next) => {
      let slug = req.params.slug;

      req.body.election = await voter.upload(slug);

      const data = await handler.createOne(Voter, req.body);

      successRes(data, '', res);
    })
  );

module.exports = router;
