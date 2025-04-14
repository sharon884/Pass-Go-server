const crypto = require("crypto");

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9090 ).toString();
};

const hashOtp = (otp) => {
    return crypto.createHash('sha256').update(otp).digest('hex');
};

const getOTPExpiry = () => {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5);
    return expiry;
}


module.exports = {
    generateOTP,
    hashOtp,
    getOTPExpiry
}