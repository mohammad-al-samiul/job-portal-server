import { ApiError } from "../utils/ApiError.js";

export const requireApprovedEmployer = (req, res, next) => {
  if (req.user.role !== "employer") {
    return next(new ApiError(403, "Not an employer"));
  }
  if (!req.user.isApproved) {
    return next(
      new ApiError(403, "Employer account not approved by admin yet")
    );
  }
  next();
};
