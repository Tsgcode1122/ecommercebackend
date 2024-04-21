// models/SalePopup.js

const mongoose = require("mongoose");

const salePopupSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  content: { type: String, required: true },
  deliveryMethod: {
    type: String,

    required: true,
  },

  images: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SalePopup", salePopupSchema);
