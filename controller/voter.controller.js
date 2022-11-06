const ErrorHandler = require('../errorController/error_handler');
const APIFeatures = require('./../utils/apiFeatures');
const Election = require('../model/election.model.js');
exports.upload = async (slug) => {
  const election = await Election.findOne({ slug });
  if (!election) {
    throw new ErrorHandler(`This election doesn't exist`);
  }
  const id = election._id;

  return id;
};
