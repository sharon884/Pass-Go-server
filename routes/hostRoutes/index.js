const express = require("express");
const router = express.Router();

const hostAuthRoutes = require("./hostAuthRoutes");
const hostProfileRoutes = require("./hostProfileRoutes");

router.use("/auth", hostAuthRoutes);
router.use("/profile", hostProfileRoutes);

module.exports = router;