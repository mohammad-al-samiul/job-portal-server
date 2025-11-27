import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { requireApprovedEmployer } from "../../middlewares/employer.middleware.js";

import {
  getJobsController,
  getJobController,
  createJobController,
  updateJobController,
  applyJobController,
  jobApplicantsController,
} from "./job.controller.js";

const jobRouter = express.Router();

// public
jobRouter.get("/", getJobsController);
jobRouter.get("/:id", getJobController);

// employer
jobRouter.post(
  "/",
  protect,
  requireApprovedEmployer, // role + approval both
  createJobController
);

jobRouter.put("/:id", protect, requireRole("employer"), updateJobController);

jobRouter.get(
  "/:id/applicants",
  protect,
  requireRole("employer"),
  jobApplicantsController
);

// jobseeker apply
jobRouter.post(
  "/:id/apply",
  protect,
  requireRole("jobseeker"),
  applyJobController
);

export default jobRouter;
