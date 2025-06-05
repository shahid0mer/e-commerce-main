import express from "express";
import {
  cancelOrder,
  createOrder,
  getUserOrder,
  placeOrderCOD,
} from "../controllers/orderController.js";
import authUser from "../middlewares/userAuth.js";
import authSeller from "../middlewares/sellerAuth.js";

const orderRouter = express.Router();
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.get("/user/:user_id", authUser, getUserOrder);
orderRouter.post("/create", authUser, createOrder);
orderRouter.put("/cancel/:order_id", authUser, cancelOrder);

export default orderRouter;
