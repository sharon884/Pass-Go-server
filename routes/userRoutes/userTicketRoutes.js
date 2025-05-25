const express = require("express");
const router = express.Router();
const { getTicketPlans , lockSeats, getAllSeatsByEvent, unlockSeat  } = require("../../controllers/userController/userTicketController");
const  verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.route("/:eventId/plans").get( verifyToken, getTicketPlans);
router.route("/lock-seats").post( verifyToken, lockSeats);
router.route("/seats/:eventId").get( verifyToken, getAllSeatsByEvent);
router.route("unlock-seat").patch( verifyToken, unlockSeat);


module.exports = router;