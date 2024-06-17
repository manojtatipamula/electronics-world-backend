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
      price: { // Optional: Store order-specific product price if needed
        type: Number,
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
  shipping_address: { // Reference to the address used for shipping
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  payment_details : { // Reference to the address used for shipping
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  }
},{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema, 'orders');
