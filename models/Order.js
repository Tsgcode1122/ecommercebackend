const mongoose = require("mongoose");

// Alright, let's include the payment method field
// I add the payment method field to keep track of how the payment was made
// And don't forget to add the pay on delivery option field too
// I also need to include the pay on delivery option field to track whether payment is made upon delivery

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Payment method field to be added
  paymentMethod: { type: String, required: true },

  // Pay on delivery option field to be added
  payOnDeliveryOption: { type: String },

  // Total price field to keep track of the overall cost
  totalPrice: { type: Number, required: true },

  cartItems: [
    {
      name: { type: String, required: true }, // Let's make sure we keep track of the product name
      details: {
        Color: { type: String }, // Adding color field to item details
        Size: { type: String }, // Adding size field to item details
        Price: { type: Number }, // Including the price of each item
        Quantity: { type: Number }, // Making sure to record the quantity of each item
        Image: { type: String }, // Also, let's not forget to include the image URL for each item
      },
    },
  ],

  // Additional form data field for any extra information needed
  formData: { type: mongoose.Schema.Types.Mixed },

  // Payment status to track if the payment is pending, completed, or failed
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending", // Default status should be pending
  },

  // Order status to track if the order is pending, shipped, or delivered
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending", // Default status should be pending
  },

  shippingDetails: {
    address: { type: String }, // Address field for shipping details
    // Add more fields for shipping details as needed
  },
  // Add more fields as needed
});

module.exports = mongoose.model("Order", orderSchema);
