// middleware for validating the data of event adding
const { body, validationResult } = require("express-validator");

// Category list could be modularized to a config or constants file for easier maintenance
const eventCategories = ["Music", "Art", "Fashion", "Motorsports"];

 const validateEventData = [
   
  body("title").notEmpty().withMessage("Event title is required"),

  body("description").notEmpty().withMessage("Event description is required"),

  body("category")
    .isIn(eventCategories)
    .withMessage(
      `Invalid category, valid categories are: ${eventCategories.join(", ")}`
    ),

  body("images")
    .isArray({ min: 3 })
    .withMessage("At least 3 images are required"),

  body("location")
    .isLength({ min: 3 })
    .withMessage("Location should be at least 3 characters long"),

  body("date").custom((value) => {
    if (new Date(value) <= new Date()) {
      throw new Error("Event date must be in the future");
    }
    return true;
  }),

  body("time").notEmpty().withMessage("Event time is required"),

  // Ticket validation
  body("tickets.vip.price")
    .isFloat({ gt: 0 })
    .withMessage("VIP ticket price must be greater than 0"),
  body("tickets.vip.quantity")
    .isInt({ gt: 0 })
    .withMessage("VIP ticket quantity must be greater than 0"),
  body("tickets.general.price")
    .isFloat({ gt: 0 })
    .withMessage("General ticket price must be greater than 0"),
  body("tickets.general.quantity")
    .isInt({ gt: 0 })
    .withMessage("General ticket quantity must be greater than 0"),

  // Business info validation
  body("businessInfo.name").notEmpty().withMessage("Business name is required"),
  body("businessInfo.organization_name")
    .notEmpty()
    .withMessage("Organization name is required"),
  body("businessInfo.email")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("businessInfo.mobile")
    .isMobilePhone()
    .withMessage("Please provide a valid mobile number"),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log( "++++++++++++++++++++++===")
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateEventData } ;
