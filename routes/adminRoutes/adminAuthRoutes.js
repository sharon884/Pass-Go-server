const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../../controllers/adminController/adminAuthController");

router.post( "/login", loginAdmin);

module.exports = router;