const CartItem = require("../models/CartItem");

// Get cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.query;

    const cartItems = await CartItem.findOne({ userId });
    if (!cartItems) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// controllers/CartController.js

// Fetch item details by itemId
exports.getItemById = async (req, res) => {
  try {
    const { userId, itemId } = req.query; // Retrieve parameters
    // First, find the user
    const user = await CartItem.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the item within the user's cart
    const item = user.items.find((item) => item.id === itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const {
      userId,
      id,
      quantity,
      productName,
      selectedColor,
      selectedSize,
      displayedPrice,
      productImage,
      availableStock,
    } = req.body;

    // Find the user's cart or create one if it doesn't exist
    let cart = await CartItem.findOne({ userId });
    if (!cart) {
      cart = new CartItem({ userId, items: [] });
    }

    // Check if the item exists in the cart
    const existingItemIndex = cart.items.findIndex((item) => item.id === id);
    if (existingItemIndex !== -1) {
      // If the item exists, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the item does not exist, add it to the cart
      cart.items.push({
        id,
        quantity,
        selectedColor,
        selectedSize,
        productName,
        displayedPrice,
        productImage,
        availableStock,
      });
    }

    // Save the updated cart to the database
    await cart.save();

    res.status(201).json(cart);
    // Log success message
    console.log("Item added to cart successfully");
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity, userId } = req.body;

    const cart = await CartItem.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const itemToUpdate = cart.items.find((item) => item.id === itemId);

    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove a cart item
exports.removeCartItem = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const cart = await CartItem.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.id !== productId);
    await cart.save();
    res.status(204).end();
    console.log("removed success productId");
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear the cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    await CartItem.deleteMany({ userId });
    res.status(204).end();
    console.log("clear success all");
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
