import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  updateProfileController,
  appliedJobsController,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter.put(
  "/profile",
  protect,
  requireRole("jobseeker"),
  updateProfileController
);

userRouter.get(
  "/applied-jobs",
  protect,
  requireRole("jobseeker"),
  appliedJobsController
);

export default userRouter;
