// controllers/ProductController.js
const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");
require("dotenv").config();
const multer = require("multer");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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

// Get single by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      description,
      images,
      variants,
      brand,

      category,
      productId,

      onSale,
      isFeatured,
      isNewRelease,
      orderCount,
    } = req.body;

    // Calculate overallStock
    let overallStock = 0;
    variants.forEach((variant) => {
      variant.sizes.forEach((size) => {
        overallStock += size.stock;
      });
    });
    let price = null;
    const firstColorVariant = variants.find((variant) => variant.color);
    if (firstColorVariant && firstColorVariant.sizes.length > 0) {
      price = firstColorVariant.sizes[0].price;
    }

    // Create a new Product instance
    const newProduct = new Product({
      name,
      description,
      images,
      variants,
      brand,
      overallStock,
      category,
      productId,
      price,
      onSale,
      isFeatured,
      isNewRelease,
      orderCount,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    console.log(savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  // Implement logic to update a product
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  // Implement logic to delete a product
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

exports.uploadImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ error: "Failed to upload image" });
    }
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Uploaded image URL:", result.secure_url);
      if (result.secure_url) {
        res.status(200).json({ imageUrl: result.secure_url });
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({ error: "Failed to upload image to Cloudinary" });
    }
  });
};
exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result === "ok") {
      console.log("image deleted");
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    res.status(500).json({ error: "Failed to delete image from Cloudinary" });
  }
};
