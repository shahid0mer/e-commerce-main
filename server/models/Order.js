import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  orderDate: { type: Date, default: Date.now },
  payment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  shippingAddress: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
