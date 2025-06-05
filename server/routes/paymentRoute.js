import express from "express";
import {
  createPayment,
  verifyPayment,
  getPaymentStatus,
  getPaymentHistory,
} from "../controllers/paymentController.js";
import authUser from "../middlewares/userAuth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", authUser, createPayment);
paymentRouter.post("/verify", authUser, verifyPayment);
paymentRouter.get("/status/:paymentId", getPaymentStatus);
paymentRouter.get("/history", getPaymentHistory);

export default paymentRouter;
