const mongoose = require("mongoose");

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Name is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      mobile: {
        type: String,
        required: [true, "Mobile number is required"],
      },
      profile_image: {
        type: String,
        default: '',
      },
      is_active: {
        type: Boolean,
        default: false,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model('User' , userSchema)