// controllers/SalePopupController.js

const SalePopup = require("../models/SalePopup");

exports.createSalePopup = async (req, res) => {
  try {
    const { heading, content, deliveryMethod, images } = req.body;
    const newSalePopup = new SalePopup({
      heading,
      content,
      deliveryMethod,
      images,
    });
    await newSalePopup.save();
    res.status(201).json(newSalePopup);
  } catch (error) {
    console.error("Error creating sale popup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
