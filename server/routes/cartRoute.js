import express from "express";
import {
  cartView,
  addCart,
  updateCart,
  removeCart,
  clearCart,
} from "../controllers/cartController.js";
import authUser from "../middlewares/userAuth.js";

const cartRouter = express.Router();

cartRouter.get("/view/:user_id", authUser, cartView);
cartRouter.post("/add", authUser, addCart);
cartRouter.put("/update", authUser, updateCart);
cartRouter.delete("/remove", authUser, removeCart);
cartRouter.delete("/clear", authUser, clearCart);

export default cartRouter;
