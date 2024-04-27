const mongoose = require("mongoose");

const onSaleMotionSlideSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const OnSaleMotionSlide = mongoose.model(
  "OnSaleMotionSlide",
  onSaleMotionSlideSchema,
);

module.exports = OnSaleMotionSlide;
