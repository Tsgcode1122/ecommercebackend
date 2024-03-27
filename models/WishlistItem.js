// models/WishlistItem.js

const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model("WishlistItem", wishlistItemSchema);
