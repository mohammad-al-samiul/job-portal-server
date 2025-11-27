import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { updateProfile, getAppliedJobs } from "./user.service.js";

export const updateProfileController = asyncHandler(async (req, res) => {
  const user = await updateProfile(req.user._id, req.body);
  res.json(new ApiResponse(200, user, "Profile updated"));
});

export const appliedJobsController = asyncHandler(async (req, res) => {
  const apps = await getAppliedJobs(req.user._id);
  res.json(new ApiResponse(200, apps));
});
