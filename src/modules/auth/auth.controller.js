import { asyncHandler } from "../../utils/asyncHandler.js";
import { registerUser, loginUser } from "./auth.service.js";
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
