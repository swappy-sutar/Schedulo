import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";

const auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.body?.token ||
      req.header("token") ||
      req.cookies?.token;
            
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing. Please login.",
      });
    }

    try {
      const decoded = jwt.verify( token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id || decoded.user,
        email: decoded.email,
        role: decoded.role,
      };
      
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please login again.",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
};

const checkAccountType = (expectedAccountType) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("role");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    
    if (user.role === expectedAccountType) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only ${expectedAccountType.toLowerCase()}s are allowed.`,
      });
    }
  } catch (error) {
    console.error("Error in account type check:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during account type verification.",
    });
  }
};

const isHr = checkAccountType("Hr");

const isAdmin = checkAccountType("Admin");

export { auth, isHr, isAdmin };
