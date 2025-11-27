import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  allAppsController,
  allJobsController,
  approveEmployerController,
  blockUserController,
  pendingEmployersController,
} from "./admin.controller.js";

const adminRouter = express.Router();

// all admin routes must be protected + admin only
adminRouter.use(protect, requireRole("admin"));

adminRouter.get("/pending-employers", pendingEmployersController);
adminRouter.patch("/employers/:id/approve", approveEmployerController);
adminRouter.patch("/users/:id/block", blockUserController);
adminRouter.get("/jobs", allJobsController);
adminRouter.get("/applications", allAppsController);

export default adminRouter;
