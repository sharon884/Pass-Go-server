const express = require("express");
const router = express.Router();

const userAuthRoutes = require("./userAuthRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const userEventRoutes = require("./userEventRoutes");
const userTicketRoutes = require("./userTicketRoutes");

router.use("/auth", userAuthRoutes);
router.use("/profile", userProfileRoutes);
router.use("/events", userEventRoutes);
router.use("/tickets", userTicketRoutes);


module.exports = router;

