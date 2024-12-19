const Review = require("../models/review");

// Create Review
exports.createReview = async (req, res) => {
  try {
    const { name, description, rating, clientImage } = req.body;

    if (!name || !description || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({ name, description, rating, clientImage });
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch All Reviews
exports.getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ totalCount: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, rating, clientImage } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { name, description, rating, clientImage },
      { new: true }
    );

    res.status(200).json({ message: "Review updated successfully", updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
