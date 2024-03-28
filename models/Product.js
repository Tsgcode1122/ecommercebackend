// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],

  variants: [
    {
      color: { type: String, required: true },
      price: { type: Number },
    },
  ],
  dimensions: [{ type: String, required: true }],
  brand: { type: String },
  category: { type: String },
  productId: { type: String, required: true },
  price: { type: [Number], required: true, validate: priceValidator },
  stock: { type: Number, required: true },
  onSale: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: true, required: true },
  isNewRelease: { type: Boolean, default: false },
  orderCount: { type: Number, default: 0 },
});

// Validator function to ensure price array has exactly 2 elements
function priceValidator(value) {
  return Array.isArray(value) && value.length === 2;
}

module.exports = mongoose.model("Product", productSchema);
