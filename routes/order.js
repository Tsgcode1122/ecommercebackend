// routes/order.js

const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/", OrderController.createOrder);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);
// Add routes for order tracking, order status update, etc.

module.exports = router;
