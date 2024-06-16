const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }, // URL or path to the product image
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});
module.exports = mongoose.model('Product', productSchema, 'products');
