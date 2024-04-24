// routes/salePopup.js

const express = require("express");
const router = express.Router();
const SalePopupController = require("../controllers/SalePopupController");

// Create a new sale popup
router.post("/", SalePopupController.createSalePopup);

// Get a single sale popup by ID
router.get("/:id", SalePopupController.getSalePopupById);
router.get("/", SalePopupController.getAllSalePopups);
// Edit a sale popup by ID
router.put("/:id", SalePopupController.editSalePopup);

// Pause a sale popup by ID
router.put("/:id/pause", SalePopupController.pauseSalePopup);

module.exports = router;
