// models/Review.js

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: { type: Number, default: 0, required: true },
  comment: { type: String },
  // Add more fields as needed
});

module.exports = mongoose.model("Review", reviewSchema);
