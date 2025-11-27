import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  myApplicationsController,
  jobApplicantsController,
  adminAllApplicationsController,
} from "./application.controller.js";

const applicationRouter = express.Router();

// Jobseeker: view own applied jobs
applicationRouter.get(
  "/me",
  protect,
  requireRole("jobseeker"),
  myApplicationsController
);

// Employer: view applicants for own job (if you want this here instead of /jobs/:id/applicants, you can keep or remove)
applicationRouter.get(
  "/:jobId/applicants",
  protect,
  requireRole("employer"),
  jobApplicantsController
);

// Admin: view all applications (read-only)
applicationRouter.get(
  "/admin/all",
  protect,
  requireRole("admin"),
  adminAllApplicationsController
);

export default applicationRouter;
