const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  electionName: {
    type: String,
    required: true,
    unique: true,
  },
  electionDate: {
    type: Date,
    required: true,
  },
  rules: {
    type: [String],
  },
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
