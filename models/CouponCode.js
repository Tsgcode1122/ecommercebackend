// models/CouponCode.js

const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  percentageOff: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  minimumOrder: {
    type: Number,
    required: true,
    min: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
