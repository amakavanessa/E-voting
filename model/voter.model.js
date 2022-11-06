const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: true,
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

voterSchema.pre(/^find/, function (next) {
  this.populate('user', 'name email');

  next();
});

const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
