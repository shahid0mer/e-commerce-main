import express from "express";

const reviewRouter = express.Router();
import {
  addReview,
  getReview,
  updateReview,
  deleteReview,
  getAllReviews,
} from "../controllers/reviewController.js";
import authUser from "../middlewares/userAuth.js";

reviewRouter.post("/add", authUser, addReview);
reviewRouter.get("/:id", authUser, getReview);
reviewRouter.put("/update/:id", authUser, updateReview);
reviewRouter.delete("/delete/:id", authUser, deleteReview);
reviewRouter.get("/product/:product_id", getAllReviews);

export default reviewRouter;
