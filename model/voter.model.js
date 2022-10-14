const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  election: {
    type: mongoose.Schema.ObjectId,
    ref: 'Election',
  },
  isAccreditated: {
    type: Boolean,
    default: false,
  },
  result: {
    type: mongoose.Schema.ObjectId,
    ref: 'Result',
  },
});

const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
