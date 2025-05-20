import express from "express";

const reviewRouter = express.Router();
import {
  addReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

reviewRouter.post("/add", addReview);
reviewRouter.get("/view", getReview);
reviewRouter.put("/update/:id", updateReview);
reviewRouter.delete("/delete/:id", deleteReview);

export default reviewRouter;
