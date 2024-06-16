const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order',
  },
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
});

module.exports = mongoose.model('OrderItem', orderItemSchema, 'order_item');
