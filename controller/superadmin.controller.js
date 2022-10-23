const ErrorHandler = require('../errorController/error_handler');
const APIFeatures = require('../utils/APIFeatures');
exports.getAll = async (Model, reqQuery) => {
  const features = new APIFeatures(Model.find(), reqQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
};

exports.getOne = async (model, id) => {
  let query = model.findById(id);

  const doc = await query;

  if (!doc) {
    throw new ErrorHandler('No document found with that ID', 404);
  }
  return doc;
};

exports.updateOne = async (Model, id, data) => {
  const doc = await Model.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    throw new ErrorHandler('No document found with that ID', 404);
  }
  return doc;
};

exports.deleteOne = async (Model, id) => {
  const doc = await Model.findByIdAndDelete(id);

  if (!doc) {
    throw new ErrorHandler('No document found with that ID', 404);
  }
  return doc;
};
