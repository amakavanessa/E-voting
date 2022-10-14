const mongoose = require('mongoose');

const pollingUnitSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.ObjectId,
    ref: 'Election',
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    required: true,
  },
  registeredVoters: {
    type: mongoose.Schema.ObjectId,
    ref: 'Voters',
  },
});

const PollingUnit = mongoose.model('PollingUnit', pollingUnitSchema);
module.exports = PollingUnit;
