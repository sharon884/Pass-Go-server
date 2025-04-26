const STATUS_CODE = require("../../constants/statuscodes");
const User = require("../../models/userModel");

const getUserProfile = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne( {email} );
    if (!user) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "Host Profile fetch successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
      
    });
  } catch (error) {
    console.log("profile fetching error :", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong!",
    });
  }
};


module.exports = {
    getUserProfile,
}