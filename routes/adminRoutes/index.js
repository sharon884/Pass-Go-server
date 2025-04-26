const express = require('express');
const router = express.Router();        

const adminAuthRoutes = require("./adminAuthRoutes");
const adminProfileRoutes = require("./adminProfileRoutes");

router.use("/auth", adminAuthRoutes);
router.use("/profile", adminProfileRoutes); 

module.exports = router;