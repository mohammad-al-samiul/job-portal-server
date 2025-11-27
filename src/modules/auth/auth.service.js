import { User } from "../user/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { generateToken } from "../../utils/token.js";

const baseUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isApproved: user.isApproved,
  isBlocked: user.isBlocked,
});

export const registerUser = async ({ name, email, password, role }) => {
  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await User.create({ name, email, password, role });

  return {
    user: baseUserResponse(user),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Account is blocked");
  }

  const token = generateToken(user._id);

  return {
    user: baseUserResponse(user),
    token,
  };
};

export const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isApproved: user.isApproved,
    isBlocked: user.isBlocked,
    profile: user.profile,
  };
};
