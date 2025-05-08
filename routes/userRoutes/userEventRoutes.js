const express = require("express");
const router = express.Router();
const { getApprovedEvents, getEventById }= require("../../controllers/userController/userEventController");

router.route("/approvedevents").get(getApprovedEvents);
router.route("/approvedevents/:id").get(getEventById);

module.exports = router;