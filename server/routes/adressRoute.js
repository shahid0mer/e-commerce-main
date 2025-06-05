import express from "express";
import authUser from "../middlewares/userAuth.js";
import {
  addAddress,
  deleteAddress,
  getDefaultAddress,
  setDefaultAddress,
  updateAddress,
  viewAddress,
  viewSingleAddress,
} from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/view", authUser, viewAddress);
addressRouter.get("/getdef", authUser, getDefaultAddress);
addressRouter.get("/:id", authUser, viewSingleAddress);
addressRouter.put("/update/:id", authUser, updateAddress);
addressRouter.delete("/delete/:id", authUser, deleteAddress);
addressRouter.put("/setdef/:id", authUser, setDefaultAddress);

export default addressRouter;
