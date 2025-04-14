const express = require( "express" );
const router = express.Router();
const { signupUser } = require( "../controllers/userAuthController");
const { verifyOTP , resendOTP } = require( "../controllers/otpController");

router.post( "/signup" , signupUser);
router.post( "/verify-otp" , verifyOTP);
router.post( "/resend-otp" , resendOTP);

module.exports = router;