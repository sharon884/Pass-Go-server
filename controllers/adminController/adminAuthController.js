const Admin = require("../../models/adminModel");
const STATUS_CODE = require("../../constants/statuscodes");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");
const { comparePassword } = require("../../utils/hash");

const loginAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        message: "Email, Password, and role are required",
      });
    }

    const existAdmin = await Admin.findOne({ email, role });
    if (!existAdmin) {
      console.log("Admin not found");
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await comparePassword(
      password,
      existAdmin.password
    );
    if (!isPasswordMatch) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const payload = {
      id: existAdmin._id,
      email: existAdmin.email,
      role: existAdmin.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "Login successfull",
      admin: {
        id: existAdmin._id,
        name: existAdmin.name,
        email: existAdmin.email,
        role: existAdmin.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "sever error during Login",
    });
  }
};

module.exports = {
  loginAdmin,
};
