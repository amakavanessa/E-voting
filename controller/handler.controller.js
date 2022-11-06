const ErrorHandler = require('../errorController/error_handler');
const APIFeatures = require('./../utils/apiFeatures');

exports.createOne = async (model, data) => {
  const doc = await model.create(data);
  if (!doc) {
    return ErrorHandler('Document not created');
  }
  return doc;
};

// exports.getOne = async (model, popOptions, id) => {
//   let query = model.findById(id);
//   if (popOptions) query = query.populate(popOptions);
//   const doc = await query;

//   if (!doc) {
//     throw new ErrorHandler('No document found with that ID');
//   }
// };
exports.getOne = async (model, id) => {
  let query = model.findById(id);

  const doc = await query;

  if (!doc) {
    throw new ErrorHandler('No document found with that ID', 404);
  }
  return doc;
};

exports.getBySlug = async (model, slug) => {
  let query = model.findOne({ slug: slug });

  const doc = await query;

  if (!doc) {
    throw new ErrorHandler('No document found with that slug', 404);
  }
  return doc;
};

exports.getAll = async (Model, reqQuery) => {
  const features = new APIFeatures(Model.find(), reqQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
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

exports.deleteOne = async (model, id) => {
  const doc = await model.findByIdAndDelete(id);

  if (!doc) {
    throw new ErrorHandler('No document found with that ID');
  }
  return doc;
};

exports.deleteAll = async (model) => {
  const doc = await model.deleteMany();

  if (!doc) {
    throw new ErrorHandler('documents not deleted');
  }
  return doc;
};
