import Review from "../models/Review.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Add a new review : /api/review/add
export const addReview = async (req, res) => {
  try {
    const { product_id, rating, content } = req.body;
    const user_id = req.userId;

    if (!product_id || !rating) {
      return res.status(400).json({
        success: false,
        message: "Product ID and rating are required",
      });
    }

    const existingReview = await Review.findOne({ user_id, product_id });
    if (existingReview) {
      return res
        .status(400)
        .json({ success: false, message: "You already reviewed this product" });
    }

    const review = new Review({ user_id, product_id, rating, content });
    await review.save();

    res.json({ success: true, message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single review by ID: /api/review/:id
export const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id)
      .populate("user_id", "name")
      .populate("product_id", "name");
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a review (only by owner)
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;
    const { rating, content } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: id, user_id },
      { rating, content },
      { new: true }
    );

    if (!review)
      return res.json({
        success: false,
        message: "Unauthorized or review not found",
      });

    res.json({ success: true, message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a review (only by owner)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;

    const result = await Review.findOneAndDelete({ _id: id, user_id });
    if (!result)
      return res.json({
        success: false,
        message: "Unauthorized or review not found",
      });

    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews for a specific product
export const getAllReviews = async (req, res) => {
  try {
    const { product_id } = req.params;
    const reviews = await Review.find({ product_id }).populate(
      "user_id",
      "name"
    );

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
