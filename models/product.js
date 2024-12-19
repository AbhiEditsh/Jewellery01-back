const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    category: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
      name: { type: String, required: true },
    },
    price: { type: Number, required: true },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
