import { Job } from "./job.model.js";
import { Application } from "../application/application.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const listJobs = async ({ location, jobType }) => {
  const filter = {};
  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }
  if (jobType) {
    filter.jobType = jobType;
  }

  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  return jobs;
};

export const getJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }
  return job;
};

export const createJob = async (payload, userId) => {
  const job = await Job.create({ ...payload, createdBy: userId });
  return job;
};

export const updateJob = async (id, payload, userId) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }
  if (job.createdBy.toString() !== userId.toString()) {
    throw new ApiError(403, "Cannot edit others' job");
  }
  Object.assign(job, payload);
  await job.save();
  return job;
};

export const applyToJob = async (jobId, applicantId) => {
  try {
    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
    });
    return application;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(400, "Already applied to this job");
    }
    throw err;
  }
};

export const getApplicantsForJob = async (jobId, employerId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }
  if (job.createdBy.toString() !== employerId.toString()) {
    throw new ApiError(403, "Not your job post");
  }

  const apps = await Application.find({ job: job._id }).populate(
    "applicant",
    "name email profile"
  );

  return apps;
};
