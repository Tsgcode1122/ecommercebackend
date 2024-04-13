// routes/order.js

const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/", OrderController.createOrder);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);
router.get("/user/:userId", OrderController.getOrdersByUserId);
router.post("/request-cancel", OrderController.requestCancelOrder);
module.exports = router;
