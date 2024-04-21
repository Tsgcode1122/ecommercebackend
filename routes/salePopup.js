// routes/salePopup.js

const express = require("express");
const router = express.Router();
const SalePopupController = require("../controllers/SalePopupController");

router.post("/", SalePopupController.createSalePopup);

module.exports = router;
