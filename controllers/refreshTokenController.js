const jwt = require("jsonwebtoken");
const STATUS_CODE = require("../constants/statuscodes");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/jwt");
const User = require("../models/userModel");

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: "refresh token missing",
      });
    }
    const decoded = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

    if (!decoded) {
      return res.status(STATUS_CODE.FORBIDDEN).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(STATUS_CODE.FORBIDDEN).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    
    user.refreshToken = null; 
    await user.save();

    const newAccessToken = generateAccessToken({ id: user._id });
    const newRefreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "AccessToken and RefreshToken genarated",
    });
  } catch (error) {
    console.log("Refresh token error:", error);
    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      success: false,
      message: " Invalid or expired refresh token",
    });
  }
};

module.exports = handleRefreshToken;
