// routes/wishlist.js

const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/WishlistController");

router.get("/getAllWishlist", WishlistController.getWishlistItems);
router.post("/", WishlistController.addToWishlist);
router.delete("/removeWishlist", WishlistController.removeWishlistItem);
router.get(
  "/single/:userId/:productId",
  WishlistController.checkProductInWishlist,
);
router.delete("/clearAllWishlist", WishlistController.clearWishlist);

module.exports = router;
