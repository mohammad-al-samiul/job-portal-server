import { ApiError } from "../../utils/ApiError.js";
import { Application } from "../application/application.model.js";
import { Job } from "../job/job.model.js";
import { User } from "../user/user.model.js";

export const pendingEmployersService = async () =>
  User.find({ role: "employer", isApproved: false });

export const approveEmployerService = async (id) => {
  const user = await User.findById(id);
  if (!user || user.role !== "employer") {
    throw new ApiError(404, "Employer not found");
  }
  user.isApproved = true;
  await user.save();
  return user;
};

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const blockOrUnblockUserService = async (id, isBlocked) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked },
    { new: true }
  ).select("-password");

  return user;
};

export const allJobsService = async () =>
  Job.find().populate("createdBy", "name email");

export const allApplicationsService = async () =>
  Application.find().populate("job").populate("applicant", "name email");
