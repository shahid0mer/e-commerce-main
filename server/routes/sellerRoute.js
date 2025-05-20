import express from "express";
import {
  isSellerAuth,
  registerSeller,
  sellerLogin,
  sellerLogout,
  viewProfile,
  updateProfile,
} from "../controllers/sellerController.js";
import authSeller from "../middlewares/sellerAuth.js";

const sellerRouter = express.Router();

sellerRouter.post("/register", registerSeller);
sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get("/logout", authSeller, sellerLogout);
sellerRouter.get("/profile", authSeller, viewProfile);
sellerRouter.put("/updateprofile", authSeller, updateProfile);

export default sellerRouter;
