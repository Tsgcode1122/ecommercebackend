// routes/wishlist.js

const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/WishlistController");

router.get("/", WishlistController.getWishlistItems);
router.post("/", WishlistController.addToWishlist);
router.delete("/:id", WishlistController.removeWishlistItem);
// Add route for clearing the wishlist

module.exports = router;
