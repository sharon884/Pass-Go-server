const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../../controllers/userController/paymentController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.route("/create-order").post( verifyToken, createOrder);
router.post("/verify-payment", verifyToken, verifyPayment);

module.exports = router;