const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Payment method field to be added
  paymentMethod: { type: String, required: true },

  // Pay on delivery option field to be added
  shippingMethod: { type: String, required: true },
  payOnDeliveryOption: { type: String },

  totalPrice: { type: Number, required: true },

  cartItems: [
    {
      name: { type: String, required: true },
      details: {
        Color: { type: String },
        Size: { type: String }, // Adding size field to item details
        Price: { type: Number }, // Including the price of each item
        Quantity: { type: Number }, // Making sure to record the quantity of each item
        Image: { type: String },
      },
    },
  ],

  formData: { type: mongoose.Schema.Types.Mixed },

  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending", // Default status should be pending
  },

  shippingDetails: {
    address: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  requestCancelOrder: { type: Boolean, default: false },
});

module.exports = mongoose.model("Order", orderSchema);
