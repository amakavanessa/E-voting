const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  Name: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
  election: {
    type: mongoose.Schema.ObjectId,
    ref: 'Election',
    require: true,
  },
  role: {
    type: String,
    default: 'election_candidate',
  },
  party: {
    type: mongoose.Schema.ObjectId,
    ref: 'PoliticalParty',
    require: true,
  },
  manifesto: {
    type: String,
    required: true,
  },
  url: String,
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;
