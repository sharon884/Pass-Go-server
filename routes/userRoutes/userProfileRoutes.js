const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../../controllers/userController/userProfileController");
const  verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.get( "/getUserProfile",  verifyToken, getUserProfile);
// router.get( "/getUserProfile", getUserProfile);

module.exports = router;