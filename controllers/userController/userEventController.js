const Event = require("../../models/eventModel");
const STATUS_CODE = require("../../constants/statuscodes");

const getApprovedEvents = async ( req, res ) => {
    try {
        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt(req.query.limit) || 6 ;
        const skip = ( page -1) * limit;

        const events = await Event.find({isApproved : true }).skip(skip).limit(limit)
        const total = await Event.countDocuments({isApproved : true });
        return res.status(STATUS_CODE.SUCCESS).json({
            success : true,
            message : "approved events from server fetched successfully",
            events,
            total,
            page,
            totalPages : Math.ceil(total / limit ),
        })
    } catch ( error ) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success : false ,
            message : "error while fetching approved events",
        });
    }
};
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findOne({ _id: id, isApproved: true });

        if (!event) {
            return res.status(STATUS_CODE.NOT_FOUND).json({
                success: false,
                message: "Event not found or not approved"
            });
        }

        return res.status(STATUS_CODE.SUCCESS).json({
            success: true,
            message: "Event fetched successfully",
            event,
        });
    } catch (error) {
        console.log("Event fetching failed", error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { getApprovedEvents,
      getEventById,
 };







