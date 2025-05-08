const Event = require("../../models/eventModel");
const STATUS_CODE = require("../../constants/statuscodes");


const createEvent =  async ( req, res ) => {
   try {
    const hostId = req.user.id;
     const {
        title,
        description,
        category,
        images,
        location,
        date,
        time,
        tickets,
        businessInfo,
        highlights, 
      } = req.body;

      if ( !Array.isArray(images) || images.length < 3 ) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
            success : false,
            message : "Minimum 3 images are required",
        });
      }
      
      const event = new Event({
          host: hostId,
          title,
          description,
          category,
          images,
          location,
          date,
          time,
          tickets,
          businessInfo,
         
        });
        
        await event.save();
        
        
      res.status(STATUS_CODE.CREATED).json({
        success : true,
        message : "Event submitted successfull after the admin verification it will show on the site"
      });
   }catch ( error ) {
    console.log("++++",error)
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success : false,
        message : "Something went wrong while creating the event",
    });
   }
};

module.exports = {
    createEvent,
}