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
});

const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
