const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.ObjectId,
    ref: 'Election',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.ObjectId,
    ref: 'Election',
  },
  voteCount: Number,
  isAwaiting: {
    type: Boolean,
    default: true,
  },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
