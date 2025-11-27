import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "Not authorized, no token"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    if (user.isBlocked) {
      return next(new ApiError(403, "Account is blocked"));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, "Token invalid or expired"));
  }
};
