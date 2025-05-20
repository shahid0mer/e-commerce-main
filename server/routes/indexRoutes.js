import express from "express";
import userRouter from "./userRoute.js";
import adminRouter from "./adminRoute.js";
import sellerRouter from "./sellerRoute.js";
import cartRouter from "./cartRoute.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/seller", sellerRouter);
router.use("/cart", cartRouter);

export default router;
