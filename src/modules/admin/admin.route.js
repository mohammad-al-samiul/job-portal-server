import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  allAppsController,
  allJobsController,
  approveEmployerController,
  getAllUsersController,
  pendingEmployersController,
} from "./admin.controller.js";
import { blockOrUnblockUserService } from "./admin.service.js";

const adminRouter = express.Router();

// all admin routes must be protected + admin only
adminRouter.use(protect, requireRole("admin"));

adminRouter.get("/pending-employers", pendingEmployersController);
adminRouter.patch("/employers/:id/approve", approveEmployerController);
adminRouter.patch("/users/:id/block", blockOrUnblockUserService);
adminRouter.get("/jobs", allJobsController);
adminRouter.get("/users", getAllUsersController);
adminRouter.get("/applications", allAppsController);

export default adminRouter;
