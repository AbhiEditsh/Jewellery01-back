const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  description: { type: String, required: true },
  gender: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  imageList: { type: [String] },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
