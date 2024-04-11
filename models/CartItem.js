const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      id: { type: String, required: true },
      quantity: { type: Number, required: true },
      selectedColor: { type: String, required: true },
      selectedSize: { type: String, required: true },
      displayedPrice: { type: Number, required: true },
      productImage: { type: String, required: true },
      productName: { type: String, required: true },
      availableStock: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("CartItem", cartItemSchema);
