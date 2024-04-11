// routes/cart.js

const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

router.get("/getUserItems", CartController.getCartItems);
router.post("/addToCart", CartController.addToCart);
router.put("/update", CartController.updateCartItem);
router.delete("/remove", CartController.removeCartItem);
router.delete("/clear", CartController.clearCart);
router.get("/singleItem", CartController.getItemById);
module.exports = router;
