const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  contactAddress: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  Residence: {
    type: String,
    required: true,
  },
  LGA: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    //so it will not display on the res file
    select: false,
  },
  role: {
    type: String,
    enum: [
      'superadmin',
      'electoral_body_superadmin',
      'electoral_body_admin',
      'election_candidate',
      'voter',
      'umpire',
    ],
    default: 'voter',
  },
  photo: String,
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//this is am instance and it is available anywhere you call this document ie schema
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
