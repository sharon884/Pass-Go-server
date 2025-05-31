const express = require("express");
const router = express.Router();
const { getUserProfile , updatePasswordUser, updateProfileUser } = require("../../controllers/userController/userProfileController");
const  verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.get( "/get-user-Profile",  verifyToken, getUserProfile);
router.route("/update-password").patch( verifyToken, updatePasswordUser);
router.route("/update-Profile").put( verifyToken, updateProfileUser );

module.exports = router;