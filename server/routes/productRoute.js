import express from "express";
import uploadMemory from "../configs/multer.js";
import authSeller from "../middlewares/sellerAuth.js";
import multer from "multer";
import {
  addProduct,
  changeStock,
  getAllProducts,
  productView,
  updatefullProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", uploadMemory.array("image"), authSeller, addProduct);
productRouter.get("/viewall", getAllProducts);
productRouter.get("/:id", productView);
productRouter.post("/update/:id", authSeller, changeStock);
productRouter.put(
  "/updateproduct/:id",
  uploadMemory.array("image"),
  authSeller,
  updatefullProduct
);

export default productRouter;
