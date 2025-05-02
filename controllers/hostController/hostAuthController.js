//Host Authentication Controller
const Host =  require("../../models/hostModel");
const STATUS_CODE = require("../../constants/statuscodes");
const { hashPassword, comparePassword } = require("../../utils/hash");
const { generateOTP, hashOtp,getOTPExpiry} = require("../../utils/otp");
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwt");
const otpModel = require("../../models/otpModel");
const sendMail = require("../../utils/sendMail");
const OTP = require("../../models/otpModel");

// Host signup
const signupHost = async ( req, res ) => {
    try {
        const { name, email, mobile, password, role } = req.body;

        const hostExist = await Host.findOne({ email });
        if ( hostExist ) {
            return res.status(STATUS_CODE.CONFLICT).json({
                message : "Email is already registered!",
            });
        }

        const hashedPassword = await hashPassword( password );

        const newHost = new Host ({
            name,
            email,
            mobile,
           password : hashedPassword,
            role,
        });
        await newHost.save();

        const plainOtp = generateOTP();
        const hashedOtp = hashOtp(plainOtp);
        const expiresAt = getOTPExpiry();

        await OTP.create({
            user_id : newHost._id,
            user_role : "Host",
            otp : hashedOtp,
            expiresAt,
        });

        await sendMail( email , "your OTP code", `Your OTP code is :${plainOtp}`);
        console.log(plainOtp);

        return res.status(STATUS_CODE.CREATED).json({
            message : "Signup successful! Please verify your account using the OTP sent to your email.",
            id : newHost._id,
            name : newHost.name,
            email : newHost.email,
            mobile : newHost.mobile,
        });
    } catch ( error ) {
        console.log("signup error!");
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message : "Something went wrong",
        });
    }
};

//Host Login
const loginHost = async ( req, res ) => {
    try {
        const { email, password, role } = req.body;

        if ( !email || !password || !role ) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({
                success : false,
                message : "Email, Password and role are required",
            })
        };
        const existHost = await Host.findOne({ email, role});
        if ( !existHost ) {
            return res.status(STATUS_CODE.UNAUTHORIZED).json({
                success : false,
                message : "Invalid credentials or role mismatch",
            });
        }
        
        const isPasswordMatch = await comparePassword( password, existHost.password);
        if ( !isPasswordMatch ) {
            return res.status(STATUS_CODE.UNAUTHORIZED).json({
                success : false,
                message : "Invalid Password",
            });
        };

        const payload = {
                  id: existHost._id,
                  email : existHost.email,
                  role : existHost.role,
                };
            
                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken(payload);
            
            await Host.findByIdAndUpdate(existHost._id, {
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
            });


        res.status(STATUS_CODE.SUCCESS).json({
            success : true,
            message : "Login successfull",
            host : {
                id: existHost._id,
                name: existHost.name,
                email: existHost.email,
                role: existHost.role,
            },
        });

    } catch ( error ) {
        console.log("Login error :" , error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "server error during Login",
        });
    }
}

//Host Logout
const logOUtHost = async ( req, res ) => {
    try {
        const { id } = req.body;
        if ( id ) {
            await Host.findByIdAndUpdate(id, {
                refreshToken : null
            });
        };

        res.clearCookie("accessToken", {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly : true,
            secure : true,
            sameSite : "strict",
        });

        return res.status(STATUS_CODE.SUCCESS).json({
            success : true,
            message : "Logged out successfully",
        });
    } catch ( error ) {
        console.log("Logout error :", error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Logout failed. please try again.",
        });
    }
};

module.exports = {
    signupHost,
    loginHost,
    logOUtHost,
}
