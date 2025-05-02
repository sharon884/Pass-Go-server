//User Authentication Controller
const User = require("../../models/userModel");
const { hashPassword, comparePassword } = require("../../utils/hash");
const STATUS_CODE = require("../../constants/statuscodes");
const { generateOTP, hashOtp, getOTPExpiry } = require("../../utils/otp");
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwt");
const sendMail = require("../../utils/sendMail");
const OTP = require("../../models/otpModel");
const { OAuth2Client } = require("google-auth-library");

//User signup
const signupUser = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

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
      role,
    });
    await newUser.save();

    const plainOtp = generateOTP();
    const hashedOtp = hashOtp(plainOtp);
    const expiresAt = getOTPExpiry();

    await OTP.create({
      user_id: newUser._id,
      user_role: "User",
      otp: hashedOtp,
      expiresAt,
    });

    await sendMail(email, "your OTP code", `Your OTP code is :${plainOtp}`);
    console.log(plainOtp);

    return res.status(STATUS_CODE.CREATED).json({
      message:
        "Signup successful! Please verify your account using the OTP sent to your email.",
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

//user login
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        message: "Email, Password, role are required!",
      });
    }

    const existUser = await User.findOne({ email, role });
    if (!existUser) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials or role mismatch",
      });
    }
    const isPasswordMatch = await comparePassword(password, existUser.password);
    if (!isPasswordMatch) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: "Invalid Password",
      });
    }

     const payload = {
          id: existUser._id,
          email : existUser.email,
          role : existUser.role,
        };
    
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
     
        await User.findByIdAndUpdate(existUser._id, {
          refreshToken : refreshToken
        });
        
    res.cookie( "accessToken", accessToken, {
      httpOnly : true,
      secure : true,
      sameSite : "strict",
      maxAge :15 * 60 * 1000,
    });

    res.cookie( "refreshToken", refreshToken, {
      httpOnly : true,
      secure : true,
      sameSite : "strict",
      maxAge :30 * 24 * 60 * 60 * 1000,
    })

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "Login successfull",
      user: {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "sever error during Login",
    });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const  googleSignupUser = async ( req, res ) => {
  try {
    const { token } = req.body;
    console.log(token);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

  
    let user = await User.findOne({ email });

    if (!user) {
    
      user = await User.create({
        name,
        email,
        profile_image: picture,
        is_active: true,
        isGoogleAccount: true,
        role: "user", 
      });
    }

   
    const jwtPayload = { id: user._id };
    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

  
    user.refreshToken = refreshToken;
    await user.save();

  
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

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "Google signup/login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
      },
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Google signup failed",
    });
  }
};


//user logout
const logOutUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (id) {
      await User.findByIdAndUpdate(id, { refreshToken: null });
    }


    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.log("Logout error:", error);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Logout failed. Please try again.",
    });
  }
};


module.exports = {
  signupUser,
  loginUser,
  googleSignupUser,
  logOutUser,
};
