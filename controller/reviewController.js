const Review = require("../models/review");

exports.createReview = async (req, res) => {
  try {
    const { name, description, rating } = req.body;
    if (!name || !description || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const image = req.files?.clientImage?.[0]?.path || null;

    const review = await Review.create({
      clientImage: image,
      name,
      description,
      rating,
    });

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch all testimonials
exports.getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      totalCount: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
