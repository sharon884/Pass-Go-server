const STATUS_CODE = require("../../constants/statuscodes");
const Host = require("../../models/hostModel");


const getHostProfile = async (req, res ) => {
    try {
        const { email } = req.user;

        const host = await Host.findOne( {email} );
        if ( !host ) {
            return res.status(STATUS_CODE.NOT_FOUND).json({
                success : false,
                message : "Host not found",
            });
        } 

        return res.status(STATUS_CODE.SUCCESS).json({
            success : true,
            message : " Host Profile fetch successfully!",
            host : {
                id : host._id,
                name : host.name,
                email : host.email,
                mobile : host.mobile,
                role : host.role,
            },
            
        });

    } catch ( error) {
        console.log(" Host profile fetching error :", error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "something went wrong!",
        });
    }
};

module.exports = {
    getHostProfile,
}