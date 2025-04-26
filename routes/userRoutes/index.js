const express = require("express");
const router = express.Router();

const userAuthRoutes = require("./userAuthRoutes");
const userProfileRoutes = require("./userProfileRoutes");

router.use("/auth", userAuthRoutes);
router.use("/profile", userProfileRoutes);

console.log("User Routes Loaded");

module.exports = router;

