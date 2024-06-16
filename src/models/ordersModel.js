const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  placed_at: {
    type: Date,
    default: Date.now,
  },
  payment_status: {
    type: String,
    required: true,
  },
  shipping_address: { // Reference to the address used for shipping
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  }
});

module.exports = mongoose.model('Order', orderSchema, 'orders');
