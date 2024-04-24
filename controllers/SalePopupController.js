// controllers/SalePopupController.js

const SalePopup = require("../models/SalePopup");

// Create a new sale popup
exports.createSalePopup = async (req, res) => {
  try {
    const { heading, content, deliveryMethod, images, coupon, liveNow } =
      req.body;
    const newSalePopup = new SalePopup({
      heading,
      content,
      deliveryMethod,
      images,
      coupon,
      liveNow,
    });
    await newSalePopup.save();
    res.status(201).json(newSalePopup);
  } catch (error) {
    console.error("Error creating sale popup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing sale popup
exports.editSalePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, content, deliveryMethod, images, coupon, liveNow } =
      req.body;
    const updatedSalePopup = await SalePopup.findByIdAndUpdate(
      id,
      { heading, content, deliveryMethod, images, coupon, liveNow },
      { new: true },
    );
    if (!updatedSalePopup) {
      return res.status(404).json({ message: "Sale popup not found" });
    }
    res.json(updatedSalePopup);
  } catch (error) {
    console.error("Error editing sale popup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Pause a sale popup
exports.pauseSalePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const pausedSalePopup = await SalePopup.findByIdAndUpdate(
      id,
      { paused: true },
      { new: true },
    );
    if (!pausedSalePopup) {
      return res.status(404).json({ message: "Sale popup not found" });
    }
    res.json(pausedSalePopup);
  } catch (error) {
    console.error("Error pausing sale popup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all sale popups
exports.getAllSalePopups = async (req, res) => {
  try {
    const salePopups = await SalePopup.find();
    res.json(salePopups);
  } catch (error) {
    console.error("Error getting sale popups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// controllers/SalePopupController.js

// Get a single sale popup by ID
exports.getSalePopupById = async (req, res) => {
  try {
    const { id } = req.params;
    const salePopup = await SalePopup.findById(id);
    if (!salePopup) {
      return res.status(404).json({ message: "Sale popup not found" });
    }
    res.json(salePopup);
  } catch (error) {
    console.error("Error getting sale popup by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
