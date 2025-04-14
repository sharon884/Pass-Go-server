const User = require("../models/userModel");
const { hashPassword } = require("../utils/hash");
const STATUS_CODE = require("../constants/statuscodes");
const { generateOTP, hashOtp,getOTPExpiry} = require("../utils/otp");
const sendMail = require("../utils/sendMail");
const OTP = require("../models/otpModel");
const {  verifyOTP } = require("../controllers/otpController");

const signupUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(STATUS_CODE.CONFLICT).json({
        message: " Email is already registered!",
      });
    }
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();

    const plainOtp = generateOTP();
    const hashedOtp = hashOtp(plainOtp);
    const expiresAt = getOTPExpiry();

    await OTP.create({
        user_id : newUser._id,
        otp : hashedOtp,
        expiresAt,
    });

    await sendMail( email , "your OTP code" ,`Your OTP code is :${plainOtp}`);
     console.log(plainOtp);
   

      return res.status(STATUS_CODE.CREATED).json({
        message: "User registered successfully",
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
      });
   
  } catch (error) {
    console.log("signup error!");
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  signupUser,
};
