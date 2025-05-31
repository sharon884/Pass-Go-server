const express = require("express");
const router = express.Router();
const { getUserBookings } = require("../../controllers/userController/userBookingController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.route("/bookings-history").get(verifyToken, getUserBookings);

module.exports = router;