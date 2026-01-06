const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Storing Image URL for simplicity
  category: { type: String, default: 'Organic' },
  discount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);