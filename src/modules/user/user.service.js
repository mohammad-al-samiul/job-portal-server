import { User } from "./user.model.js";
import { Application } from "../application/application.model.js";

export const updateProfile = async (userId, { bio, skills, resumeUrl }) => {
  const user = await User.findById(userId);
  user.profile.bio = bio;
  user.profile.resumeUrl = resumeUrl;
  user.profile.skills = skills ? skills.split(",").map((s) => s.trim()) : [];
  await user.save();
  return user;
};

export const getAppliedJobs = async (userId) => {
  const apps = await Application.find({ applicant: userId }).populate("job");
  return apps;
};
