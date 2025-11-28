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
  const { user, token } = await loginUser(req.body);

  // Set cookie here
  res.cookie("jobPortalToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Logged in successfully"));
});

export const meController = asyncHandler(async (req, res) => {
  const data = await getMe(req.user._id);
  res.json(new ApiResponse(200, data, "Authenticated user fetched"));
});
