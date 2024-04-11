// controllers/WishlistController.js

const WishlistItem = require("../models/WishlistItem");
const Product = require("../models/Product");
// Get wishlist items for a user
exports.getWishlistItems = async (req, res) => {
  try {
    const { userId } = req.query;

    // Find wishlist items for the user
    const wishlistItems = await WishlistItem.findOne({ userId });
    if (!wishlistItems) {
      return res.status(404).json({ error: "Wishlist is empty" });
    }

    // Extract product IDs from wishlist items
    const productIds = wishlistItems.wishlists.map((item) => item.productId);

    // Fetch product details for the products in the wishlist
    const products = await Product.find({ _id: { $in: productIds } });

    // Combine wishlist items with product details
    const wishlistWithProductDetails = wishlistItems.wishlists.map(
      (wishlistItem) => {
        const product = products.find((product) =>
          product._id.equals(wishlistItem.productId),
        );
        return { ...wishlistItem.toObject(), product };
      },
    );

    res.status(200).json({ wishlist: wishlistWithProductDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      return res
        .status(400)
        .json({ error: "productId and userId are required" });
    }

    // Find the WishlistItem document for the user
    let wishlistItem = await WishlistItem.findOne({ userId });

    if (!wishlistItem) {
      // If the WishlistItem document doesn't exist, create a new one
      wishlistItem = new WishlistItem({
        userId,
        wishlists: [{ productId }],
      });
    } else {
      // If the WishlistItem document exists, update the wishlist array
      wishlistItem.wishlists.push({ productId });
    }

    await wishlistItem.save();

    res.status(201).json({ message: "Item added to wishlist successfully" });
    console.log("Item added to wishlist successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove a wishlist item
exports.removeWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "userId and productId are required" });
    }

    // Find the WishlistItem document for the user
    const wishlistItem = await WishlistItem.findOne({ userId });

    if (!wishlistItem) {
      return res.status(404).json({ error: "Wishlist not found for the user" });
    }

    // Remove the specified productId from the wishlist array
    wishlistItem.wishlists = wishlistItem.wishlists.filter(
      (item) => item.productId !== productId,
    );

    // Save the updated WishlistItem document
    await wishlistItem.save();

    res
      .status(200)
      .json({ message: "Item removed from wishlist successfully" });
    console.log("Item removed successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear the entire wishlist
exports.clearWishlist = async (req, res) => {
  const { userId } = req.body;
  try {
    await WishlistItem.deleteMany({ userId });
    res.status(200).json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// controllers/WishlistController.js

exports.checkProductInWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await WishlistItem.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isInWishlist = user.wishlists.some(
      (wishlist) => wishlist.productId === productId,
    );

    res.status(200).json({ isInWishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
