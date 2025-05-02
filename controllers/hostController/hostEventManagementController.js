const Event = require("../../models/eventModel");
const STATUS_CODE = require("../../constants/statuscodes");


const createEvent =  async () => {
    try {
        const newEvent = new Event(req.body);
         await newEvent.save();
         return res.status(STATUS_CODE.CREATED).json({
            success : true,
            message : "Event added successfully",
         });
    }catch ( error ) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : "Failed to create Event :", error : error.message,
        });
    }
};

module.exports = {
    createEvent,
}