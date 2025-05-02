const express = require('express');
const router = express.Router();        

const adminAuthRoutes = require("./adminAuthRoutes");
const adminProfileRoutes = require("./adminProfileRoutes");
const adminUserManagementRoutes = require("./adminUserManagementRoutes");
const adminHostManagement = require("./adminHostManagementRoutes");

router.use("/auth", adminAuthRoutes);
router.use("/profile", adminProfileRoutes); 
router.use( "/userManagement" , adminUserManagementRoutes);
router.use( "/hostManagement" ,  adminHostManagement)

module.exports = router;