//Host Event Management related routes
const express = require("express");
const router = express.Router();
const { createEvent } = require("../../controllers/hostController/hostEventManagementController");
const  verifyTokenMiddleware  = require("../../middlewares/verifyTokenMiddleware");
const  validateEventData  = require("../../middlewares/hostRelatedMiddlewares/hostEventAddingValidationMiddleware");
const {  verifyHostMiddleware } = require("../../middlewares/hostRelatedMiddlewares/verifyHostMiddleware.js");
const runValidation = require("../../middlewares/globalMiddleware/globalValidationResultMiddleware")


router.post( "/eventadd", verifyTokenMiddleware ,  verifyHostMiddleware,  validateEventData, runValidation, createEvent );

module.exports = router;