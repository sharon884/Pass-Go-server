//Admin Authentication Related Routes
const express = require("express");
const router = express.Router();
const { loginAdmin, logOutAdmin } = require("../../controllers/adminController/adminAuthController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.post( "/login", loginAdmin);
router.post( "/logoutaAdmin", verifyToken, logOutAdmin );

module.exports = router;