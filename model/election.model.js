const mongoose = require('mongoose');
const slugify = require('slugify');

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
  slug: String,
});
electionSchema.index({ slug: 1 });

electionSchema.pre('save', function (next) {
  this.slug = slugify(this.electionName, { lower: true });
  next();
});
const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
