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

const router = express.Router();

// public
router.get("/", getJobsController);
router.get("/:id", getJobController);

// employer
router.post(
  "/",
  protect,
  requireApprovedEmployer, // role + approval দুইটা একসাথে
  createJobController
);

router.put("/:id", protect, requireRole("employer"), updateJobController);

router.get(
  "/:id/applicants",
  protect,
  requireRole("employer"),
  jobApplicantsController
);

// jobseeker apply
router.post(
  "/:id/apply",
  protect,
  requireRole("jobseeker"),
  applyJobController
);

export default router;
