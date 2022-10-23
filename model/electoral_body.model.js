const mongoose = require('mongoose');

const electoralBodySchema = new mongoose.Schema({
  Name: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  position: {
    type: String,
  },
  role: {
    type: String,
    default: 'electoral_body_admin',
  },

  url: String,
});

const ElectoralBody = mongoose.model('ElectoralBody', electoralBodySchema);
module.exports = ElectoralBody;
