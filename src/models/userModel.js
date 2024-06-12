const mongoose = require('mongoose');
const helpers = require('../helpers');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  // Add any other user details you want to store
  // e.g., address, phone number, etc.
}, { timestamps: true });

// Hash password before saving the user
userSchema.pre('save', async (next) => {
  if (this.isNew || this.isModified('password')) {
    this.password = await helpers.hashPassword(this.password);
  }
  next();
});

// const userSchema = new mongoose.Schema({}, {strict : false})

module.exports = mongoose.model('User', userSchema, 'users');
