import { Application } from "./application.model.js";
import { Job } from "../job/job.model.js";

export const getAppliedJobsService = async (userId) => {
  return Application.find({ applicant: userId }).populate("job");
};

export const getApplicantsByJobService = async (jobId, employerId) => {
  const job = await Job.findById(jobId);
  if (!job) throw new Error("Job not found");

  if (job.createdBy.toString() !== employerId.toString()) {
    throw new Error("You are not the owner of this job");
  }

  return Application.find({ job: jobId }).populate(
    "applicant",
    "name email profile"
  );
};

export const adminAllApplicationsService = async () => {
  return Application.find()
    .populate("job")
    .populate("applicant", "name email profile");
};
