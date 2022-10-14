const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  election: {
    type: mongoose.Schema.ObjectId,
    ref: 'Election',
  },
  pollingUnit: {
    type: mongoose.Schema.ObjectId,
    ref: 'PollingUnit',
  },
});

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
