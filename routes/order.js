// routes/order.js

const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.getAllOrders);
router.get("/cancel-orders", OrderController.getOrdersToCancel);
router.get("/:id", OrderController.getOrderById);
router.post("/", OrderController.createOrder);
router.put("/updateOrder", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);
router.get("/user/:userId", OrderController.getOrdersByUserId);
router.post("/request-cancel", OrderController.requestCancelOrder);
router.put("/cancel-orders/:id", OrderController.cancelOrderById);

module.exports = router;
