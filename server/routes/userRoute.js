import express from "express";
import {
  isAuth,
  registerUser,
  userLogin,
  userLogout,
  viewProfile,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, userLogout);
userRouter.get("/profile", authUser, viewProfile);
userRouter.put("/updateprofile", authUser, updateProfile);

export default userRouter;
