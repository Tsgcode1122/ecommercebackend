// routes/product.js

const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);

router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

router.get("/featured", ProductController.getFeaturedProducts);
router.post("/upload-image", ProductController.uploadImage);
router.delete("/images/delete", ProductController.deleteImage);

module.exports = router;
