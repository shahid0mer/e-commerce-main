import express from "express";
import {
  cartView,
  addCart,
  updateCart,
  removeCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/viewall", cartView);
cartRouter.post("/add", addCart);
cartRouter.put("/update/:productid", updateCart);
cartRouter.delete("/remove/:productid", removeCart);

export default cartRouter;
