const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter a valid email address",
        ],
      },
      password: {
        type: String,
        required: function () {
          return !this.isGoogleAccount;
        },
        minlength: [6, "Password must be at least 6 characters"],
      },
      mobile: {
        type: String,
        required: function () {
          return !this.isGoogleAccount;
        },
        match: [/^\d{10}$/, "Mobile number must be 10 digits"],
      },
      profileImage: {
        type: String,
        default: "", 
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      is_active: {
        type: Boolean,
        default : false,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      role: {
        type: String,
        enum: ["user", "host", "admin"],
        default: "user", 
      },
      refreshToken: {
        type: String,
        default: null,
      },
      isGoogleAccount: {
        type: Boolean,
        default: false,
      },
});


module.exports = mongoose.model('Host' , hostSchema);