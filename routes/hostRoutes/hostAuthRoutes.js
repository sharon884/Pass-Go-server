const express = require("express");
 const router = express.Router(); 
 const { signupHost, loginHost } = require("../../controllers/hostController/hostAuthController");
const { verifyOTP } = require("../../controllers/otpController");


 router.post( "/signup", signupHost);
 router.post( "/verify-otp", verifyOTP);
 router.post( "/login", loginHost);


 module.exports = router;