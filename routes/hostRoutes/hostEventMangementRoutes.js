//Host Event Management related routes
const express = require("express");
const router = express.Router();
const { createEvent } = require("../../controllers/hostController/hostEventManagementController");
const  verifyTokenMiddleware  = require("../../middlewares/verifyTokenMiddleware");
const { validateEventData } = require("../../middlewares/hostRelatedMiddlewares/hostEventAddingValidationMiddleware");
const {  verifyHostMiddleware } = require("../../middlewares/hostRelatedMiddlewares/verifyHostMiddleware.js");
const upload  = require("../../middlewares/hostRelatedMiddlewares/multerConfig");

router.post( "/eventadd", verifyTokenMiddleware ,  verifyHostMiddleware, upload.array("images", 10), validateEventData, createEvent);

module.exports = router;