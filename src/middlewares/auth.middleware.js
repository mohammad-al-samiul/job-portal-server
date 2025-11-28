import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check cookie first (primary authentication)
    if (req.cookies?.jobPortalToken) {
      token = req.cookies.jobPortalToken;
    }

    // 2. Fallback → Authorization header support
    else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token found
    if (!token) {
      throw new ApiError(401, "Not authorized, token missing");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from decoded token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new ApiError(401, "User not found");

    // Check if blocked
    if (user.isBlocked) throw new ApiError(403, "Your account is blocked");

    req.user = user; // Attach user to request
    next(); // Continue to protected route
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
