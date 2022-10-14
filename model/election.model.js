const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  electionName: {
    type: String,
    required: true,
  },
  electionDate: [Date],
  results: {
    type: mongoose.Schema.ObjectId,
    ref: 'Result',
  },
  rules: {
    type: String,
    required: true,
    minlength: 50,
  },
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
