const User = require("../models/userModel");
const Host = require("../models/hostModel");
const Admin = require("../models/adminModel");

const getModelByRole = ( role ) => {
    switch ( role ) {
        case "user" :
            return User;
        case "host" :
            return Host;
        case "admin" :
            return Admin;  
        default : 
           throw new Error("Invalid role");      
    }
};

module.exports = {
    getModelByRole,
}