import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  listJobs,
  getJobById,
  createJob,
  updateJob,
  applyToJob,
  getApplicantsForJob,
} from "./job.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getJobsController = asyncHandler(async (req, res) => {
  const jobs = await listJobs(req.query);
  res.json(new ApiResponse(200, jobs));
});

export const getJobController = asyncHandler(async (req, res) => {
  const job = await getJobById(req.params.id);
  res.json(new ApiResponse(200, job));
});

export const createJobController = asyncHandler(async (req, res) => {
  const job = await createJob(req.body, req.user._id);
  res.status(201).json(new ApiResponse(201, job, "Job created"));
});

export const updateJobController = asyncHandler(async (req, res) => {
  const job = await updateJob(req.params.id, req.body, req.user._id);
  res.json(new ApiResponse(200, job, "Job updated"));
});

export const applyJobController = asyncHandler(async (req, res) => {
  const application = await applyToJob(req.params.id, req.user._id);
  res.status(201).json(new ApiResponse(201, application, "Applied"));
});

export const jobApplicantsController = asyncHandler(async (req, res) => {
  const apps = await getApplicantsForJob(req.params.id, req.user._id);
  res.json(new ApiResponse(200, apps));
});
