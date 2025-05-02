//Host Authentication related Routes
const express = require("express");
 const router = express.Router(); 
 const { signupHost, loginHost, logOUtHost } = require("../../controllers/hostController/hostAuthController");
const { verifyOTP } = require("../../controllers/otpController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");


 router.post( "/signup", signupHost);
 router.post( "/verify-otp", verifyOTP);
 router.post( "/login", loginHost);
 router.route("/logoutHost").post(verifyToken, logOUtHost );


 module.exports = router;