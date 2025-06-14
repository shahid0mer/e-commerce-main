import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: Number },
    address: { type: String },
    password: { type: String, required: true, minLength: 6 },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
