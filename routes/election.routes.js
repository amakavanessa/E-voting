const express = require('express');
const Election = require('../model/election.model');
const handler = require('../controller/handler.controller');
const catchAsync = require('../common/catch_Async');
const successRes = require('../utils/successResponse');
const middlewares = require('../common/middlewares');
const router = express.Router();

router
  .route('/')
  .get(
    catchAsync(async (req, res, next) => {
      const query = req.query;
      const elections = await handler.getAll(Election, query);

      successRes(elections.length, elections, res);
    })
  )
  .post(
    middlewares.protect,
    middlewares.restrictTo('superadmin'),
    catchAsync(async (req, res, next) => {
      const data = req.body;
      let result = await handler.createOne(Election, data);
      // console.log(`dats is ${data}`);
      successRes(result, '', res);
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      let result = await handler.deleteAll(Election);
      successRes(result, res);
    })
  );

router
  .route('/:id')
  .get(
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const election = await handler.getOne(Election, id);
      successRes(election, null, res);
    })
  )
  .patch(
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const data = req.body;
      const election = await handler.updateOne(Election, id, data);
      successRes(election, null, res);
    })
  )
  .delete(
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      await handler.deleteOne(Election, id);
      successRes('', null, res);
    })
  );

module.exports = router;
