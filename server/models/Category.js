import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model("Category", categorySchema);
