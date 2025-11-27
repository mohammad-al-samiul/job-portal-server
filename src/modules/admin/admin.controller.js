import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  allApplicationsService,
  allJobsService,
  approveEmployerService,
  blockUserService,
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
  const { isBlocked } = req.body;
  const user = await blockUserService(req.params.id, isBlocked);
  res.json(user);
});

export const allJobsController = asyncHandler(async (req, res) => {
  const jobs = await allJobsService();
  res.json(jobs);
});

export const allAppsController = asyncHandler(async (req, res) => {
  const apps = await allApplicationsService();
  res.json(apps);
});
