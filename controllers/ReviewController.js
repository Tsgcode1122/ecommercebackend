// controllers/ReviewController.js

const Review = require("../models/Review");

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  // Implement logic to create a new review
};

// Update a review
exports.updateReview = async (req, res) => {
  // Implement logic to update a review
};

// Delete a review
exports.deleteReview = async (req, res) => {
  // Implement logic to delete a review
};
