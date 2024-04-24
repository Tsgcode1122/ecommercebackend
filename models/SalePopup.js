const mongoose = require("mongoose");

const salePopupSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  content: { type: String, required: true },
  coupon: { type: String },
  deliveryMethod: {
    type: String,
    enum: ["emailInput", "couponGiving", "noInput"],
    required: true,
  },
  images: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  liveNow: { type: Boolean, default: false }, // New field
});

module.exports = mongoose.model("SalePopup", salePopupSchema);
