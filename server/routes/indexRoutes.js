import express from "express";
import userRouter from "./userRoute.js";
import adminRouter from "./adminRoute.js";
import sellerRouter from "./sellerRoute.js";
import cartRouter from "./cartRoute.js";
import productRouter from "./productRoute.js";
import addressRouter from "./adressRoute.js";
import orderRouter from "./orderRoute.js";
import reviewRouter from "./reviewRoute.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/seller", sellerRouter);
router.use("/cart", cartRouter);
router.use("/product", productRouter);
router.use("/address", addressRouter);
router.use("/order", orderRouter);
router.use("/review", reviewRouter);

export default router;
