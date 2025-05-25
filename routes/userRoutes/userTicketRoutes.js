const express = require("express");
const router = express.Router();
const { getTicketPlans , lockSeats, getAllSeatsByEvent,  } = require("../../controllers/userController/userTicketController");
const  verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.route("/:eventId/plans").get( verifyToken, getTicketPlans);
router.route("/lock-seats").post( verifyToken, lockSeats);
router.route("/seats/:eventId").get( verifyToken, getAllSeatsByEvent);


module.exports = router;