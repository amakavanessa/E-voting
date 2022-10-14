const mongoose = require('mongoose');

const politicalPartySchema = new mongoose.Schema({
  name: String,
  elections: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Election',
    },
  ],
  candidates: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Candidate',
    },
  ],
  campaign: String,
});

const PoliticalParty = mongoose.model('Political', politicalPartySchema);
module.exports = PoliticalParty;
