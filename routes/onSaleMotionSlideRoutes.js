const express = require("express");
const router = express.Router();
const onSaleMotionSlideController = require("../controllers/onSaleMotionSlideController");

// Create on-sale motion slide
router.post("/", onSaleMotionSlideController.createOnSaleMotionSlide);

// Edit on-sale motion slide
router.put("/:id", onSaleMotionSlideController.editOnSaleMotionSlide);

// Get on-sale motion slide
router.get("/", onSaleMotionSlideController.getOnSaleMotionSlide);

module.exports = router;
