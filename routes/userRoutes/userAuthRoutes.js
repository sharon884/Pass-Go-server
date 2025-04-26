const express = require( "express" );
const router = express.Router();
const { signupUser, loginUser, googleSignupUser,logOutUser } = require( "../../controllers/userController/userAuthController");
const { verifyOTP , resendOTP } = require( "../../controllers/otpController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.post( "/signup" , signupUser);
router.post( "/verify-otp" , verifyOTP);
router.post( "/resend-otp" , resendOTP);
router.post( "/login", loginUser);
router.post( "/google-signup", googleSignupUser);
router.post( "/logoutUser", verifyToken, logOutUser);


module.exports = router;