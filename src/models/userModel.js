const mongoose = require('mongoose');

/* const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // Add other user specific fields if needed (e.g., address, phone number)
}); */

// Optional: Hash password before saving (security best practice)
// userSchema.pre('save', async function(next) {
//   // Implement password hashing logic here (using bcryptjs or similar)
//   next();
// });

// "_id","first_name","last_name","email","date","userName"
// const userSchema = new mongoose.Schema({
//     first_name: {
//         type: 'String'
//     },
//     last_name: {
//         type: 'String'
//     },
//     email: {
//         type: 'String'
//     },
//     user_name: {
//         type: 'String'
//     }
// })

const userSchema = new mongoose.Schema({}, {strict : false})

module.exports = mongoose.model('User', userSchema, "users");