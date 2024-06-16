const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order',
  },
  payment_method: {
    type: String,
    required: true,
  },
  payment_intent_id: { // Example: Stripe payment intent ID
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // ... other payment details (e.g., status, fees)
});

module.exports = mongoose.model('Payment', paymentSchema, 'payments');
