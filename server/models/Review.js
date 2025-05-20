const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  content: { type: String, maxLength: 500 },
  date: { type: Date, default: Date.now },
});

reviewSchema.index({ product_id: 1 });

module.exports = mongoose.model("Review", reviewSchema);
