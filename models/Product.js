// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }], // Array of image URLs
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Array of review IDs
  color: { type: String },
  dimensions: { type: String },
  brand: { type: String },
  category: { type: String },
  productId: { type: String, required: true }, // Product ID or SKU
  price: { type: Number, required: true },
  salePrice: { type: Number },
  stock: { type: Number, required: true },
  onSale: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: true, required: true },
  isNewRelease: { type: Boolean, default: false },
  orderCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
