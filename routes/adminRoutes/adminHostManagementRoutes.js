// Admin Host Management Routes 

const express = require("express");
const router = express.Router();
const  { getAllHost, toggleBlockHost, toggleVerifyHost, editHost } = require("../../controllers/adminController/adminHostManagementController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.route("/hostList").get(verifyToken, getAllHost );

router.route("/host/block/:hostId").put(verifyToken, toggleBlockHost );

router.route("/host/verify/:hostId").put( verifyToken, toggleVerifyHost );

router.route("/host/edit").put( verifyToken, editHost );

module.exports = router;