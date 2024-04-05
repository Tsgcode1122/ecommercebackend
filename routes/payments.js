const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/PaymentController");

// Route to create a payment intent
router.post("/create-payment-intent", paymentsController.createPaymentIntent);

module.exports = router;
