import { asyncHandler } from "../../utils/asyncHandler.js";
import { registerUser, loginUser, getMe } from "./auth.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const registerController = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, result, "User registered successfully"));
});

export const loginController = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);
  res.status(200).json(new ApiResponse(200, result, "Logged in successfully"));
});

export const meController = asyncHandler(async (req, res) => {
  const data = await getMe(req.user._id);
  res.json(new ApiResponse(200, data, "Authenticated user fetched"));
});
