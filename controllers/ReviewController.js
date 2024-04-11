// controllers/ReviewController.js

const Review = require("../models/Review");
const User = require("../models/User");
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
// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment, productId, userId } = req.body;

    // Fetch user data based on userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract user's full name
    const fullName = user.fullName;

    // Create new review with user's full name instead of userId
    const newReview = new Review({
      rating,
      comment,
      productId,
      fullName,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, productId, userId } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment, productId, userId },
      { new: true },
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
