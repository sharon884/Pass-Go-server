const express = require('express');
const router = express.Router();       

const { getAdminProfile } = require("../../controllers/adminController/adminProfileController");
const verifyToken = require("../../middlewares/verifyTokenMiddleware"); 

// Route to get admin profile
router.get("/getAdminProfile", verifyToken, getAdminProfile); 


module.exports = router;
