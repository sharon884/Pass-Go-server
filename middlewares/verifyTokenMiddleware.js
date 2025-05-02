const jwt = require("jsonwebtoken");
const STATUS_CODE = require("../constants/statuscodes");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = ( req, res, next ) => {
    try {
        const token = req.cookies ?.accessToken;
        

        if ( !token ) {
            return res.status(STATUS_CODE.UNAUTHORIZED).json({
                success : false ,
                message : "Access Token missing",
            });
        }
        const decoded = jwt.verify( token , ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }catch ( error ) {
        console.error("Token error:", error.message);
        return res.status(STATUS_CODE.UNAUTHORIZED).json({
            success : false ,
            message : " invalid or expired accessToken "
        });
    }
};

module.exports = verifyToken;