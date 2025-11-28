import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  allApplicationsService,
  allJobsService,
  approveEmployerService,
  blockOrUnblockUserService,
  getAllUsersService,
  pendingEmployersService,
} from "./admin.service.js";

export const pendingEmployersController = asyncHandler(async (req, res) => {
  const users = await pendingEmployersService();
  res.json(users);
});

export const approveEmployerController = asyncHandler(async (req, res) => {
  const user = await approveEmployerService(req.params.id);
  res.json(user);
});

export const blockUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isBlocked } = req.body;

  const user = await blockOrUnblockUserService(id, isBlocked);

  return res.status(200).json({
    success: true,
    message: isBlocked
      ? "User blocked successfully"
      : "User unblocked successfully",
    data: user,
  });
});

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsersService();

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

export const allJobsController = asyncHandler(async (req, res) => {
  const jobs = await allJobsService();
  res.json(jobs);
});

export const allAppsController = asyncHandler(async (req, res) => {
  const apps = await allApplicationsService();
  res.json(apps);
});
