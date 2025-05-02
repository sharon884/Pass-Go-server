// Admin User Management Routes 

const express = require('express');
const router = express.Router();

const { getAllUser , toggleBlockUser, editUser} = require('../../controllers/adminController/adminUserManagementController');
const verifyToken = require("../../middlewares/verifyTokenMiddleware");

router.route('/userList').get(verifyToken, getAllUser);

router.route("/users/block/:userId").put(verifyToken, toggleBlockUser );

router.route("/users/edit").put(verifyToken, editUser );


module.exports = router;