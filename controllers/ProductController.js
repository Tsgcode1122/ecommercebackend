// controllers/ProductController.js

const Product = require("../models/Product");

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
    console.log(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  // Implement logic to fetch a product by ID
};

// Create a new product
exports.createProduct = async (req, res) => {
  // Implement logic to create a new product
};

// Update a product
exports.updateProduct = async (req, res) => {
  // Implement logic to update a product
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  // Implement logic to delete a product
};
