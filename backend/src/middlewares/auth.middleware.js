import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
// import blacklistModel from "../models/blacklisted.model.js";
import redis from "../config/cache.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throw new ApiError("Authentication required", 401);

    // await blacklistModel.findOne({ token });
    const isBlackListedToken = await redis.get(token)
    if (isBlackListedToken) throw new ApiError("Token is blacklisted", 401);

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    // if (error instanceof ApiError) return next(error);
    // return next(new ApiError("Invalid or expired token", 401));
    next(error);
  }
};

export default authMiddleware;
