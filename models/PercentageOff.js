const mongoose = require("mongoose");

const percentageOffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  percentageOff: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PercentageOff", percentageOffSchema);
