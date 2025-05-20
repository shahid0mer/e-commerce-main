import express from "express";
import {
  createPayment,
  verifyPayment,
  getPaymentStatus,
  getPaymentHistory,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", createPayment);
paymentRouter.post("/verify", verifyPayment);
paymentRouter.get("/status/:paymentId", getPaymentStatus);
paymentRouter.get("/history", getPaymentHistory);

export default paymentRouter;
