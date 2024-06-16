const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Foreign key referencing the User collection
  },
  address_line1: {
    type: String,
    required: true,
  },
  address_line2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
  // Add any other user details you want to store
  // e.g., address, phone number, etc.
}, { timestamps: true });

// const userSchema = new mongoose.Schema({}, {strict : false})

module.exports = mongoose.model('Address', addressSchema, 'address');
