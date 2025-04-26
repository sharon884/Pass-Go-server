const express = require('express');
const router = express.Router();
const { getHostProfile } = require("../../controllers/hostController/hostProfileController.JS");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.get("/getHostProfile", verifyToken, getHostProfile);

module.exports = router;