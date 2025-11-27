import express from "express";
import {
  loginController,
  meController,
  registerController,
} from "./auth.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", protect, meController);

export default authRouter;
