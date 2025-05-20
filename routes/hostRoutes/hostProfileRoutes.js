//Host Profile related Routes
const express = require('express');
const router = express.Router();
const { getHostProfile } = require("../../controllers/hostController/hostProfileController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");
const { updateHostProfile } = require("../../controllers/hostController/hostProfileController")
const { updatePasswordHost } = require('../../controllers/hostController/hostProfileController');
const { requestVerificationHost } = require("../../controllers/hostController/hostProfileController");
// const  updateHostProfile = require("../../controllers/hostController/hostProfileController.JS");

router.get("/get-Host-Profile", verifyToken, getHostProfile);
router.route("/update-password").patch( verifyToken, updatePasswordHost);
router.route("/update-Host-Profile").put( verifyToken, updateHostProfile );
router.route("/account/verify-request").post( verifyToken, requestVerificationHost );

module.exports = router;