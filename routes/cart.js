// routes/cart.js

const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

router.get("/", CartController.getCartItems);
router.post("/", CartController.addToCart);
router.put("/:id", CartController.updateCartItem);
router.delete("/:id", CartController.removeCartItem);
// Add route for clearing the cart

module.exports = router;
