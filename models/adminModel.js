const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
     email : {
        type : String,
        required : true,
        unique : true,
     },
     password : {
        type : String,
        required : true,
     },
     role: {
        type: String,
        default: "admin", 
      },
    is_active : {
        type : Boolean,
        default : true,
    },
    createdAt : {
        type : Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Admin", adminSchema);