import * as AppService from "./application.service.js";

// GET /api/applications/me
export const myApplicationsController = async (req, res) => {
  try {
    const apps = await AppService.getAppliedJobsService(req.user._id);

    res.status(200).json({
      success: true,
      data: apps,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to fetch applications",
    });
  }
};

// GET /api/applications/:jobId/applicants
export const jobApplicantsController = async (req, res) => {
  try {
    const applicants = await AppService.getApplicantsByJobService(
      req.params.jobId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: applicants,
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message || "Not allowed to view applicants",
    });
  }
};

// GET /api/applications/admin/all
export const adminAllApplicationsController = async (req, res) => {
  try {
    const apps = await AppService.adminAllApplicationsService();

    res.status(200).json({
      success: true,
      data: apps,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Failed to fetch all applications",
    });
  }
};
