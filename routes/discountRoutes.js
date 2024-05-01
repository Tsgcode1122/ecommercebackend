// routes/discountRoutes.js

const express = require("express");
const router = express.Router();
const discountController = require("../controllers/DiscountController");

// POST endpoint to create a coupon code
router.post("/coupon-code", discountController.createCouponCode);
router.get("/coupon-code", discountController.getAllCouponCodes);
router.put("/coupon-code/:id", discountController.updateCouponCode);
router.delete("/coupon-code/:id", discountController.deleteCouponCode);
// POST endpoint to create a percentage off discount
router.post("/percentage-off", discountController.createPercentageOff);
router.get("/percentage-off", discountController.getAllPercentageOff);
router.post("/apply-percentage", discountController.applyPercentageDiscount);
module.exports = router;
