// models/WishlistItem.js

const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wishlists: [
    {
      productId: { type: String },
    },
  ],
});

module.exports = mongoose.model("WishlistItem", wishlistItemSchema);
