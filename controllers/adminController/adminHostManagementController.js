const Host = require("../../models/hostModel");
const STATUS_CODE = require("../../constants/statuscodes");
const Notification = require("../../models/HostNotificationModel");

const getAllHost = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ],
    };
    const totalHosts = await Host.countDocuments(query);
    const hosts = await Host.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("name email mobile role is_active isVerified");

    res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      hosts,
      totalPages: Math.ceil(totalHosts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: " server error",
      error: error.message,
    });
  }
};

const toggleBlockHost = async (req, res) => {
  try {
    const { hostId } = req.params;
    const existHost = await Host.findById(hostId);
    if (!existHost) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: false,
        message: "Host not found",
      });
    }

    existHost.is_active = !existHost.is_active;
    await existHost.save();

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: `Host has been ${existHost.is_active ? "Unblocked" : "Blocked"}`,
      existHost,
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: " servor error while toggling block status",
    });
  }
};

const toggleVerifyHost = async (req, res) => {
  try {
    const { hostId } = req.params;

    const existHost = await Host.findById(hostId);
    if (!existHost) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: false,
        message: "Host not found",
      });
    }

    existHost.isVerified = !existHost.isVerified;
    await existHost.save();

    const message = existHost.isVerified
      ? "Your account has been verified by admin!"
      : "Your account has been unverified by admin.";

      await Notification.create({
        userId : hostId,
        message : message,
      });

      const io = req.app.get("io");
      if ( io ) {
        console.log(`Emitting 'host-verification-status' to hostId: ${hostId}`, message);
        io.to(hostId).emit("host-verification-status", {
        
          message,
          hostId,
          verified : existHost.isVerified,
          timestamp : Date.now(),
        })
         
      }

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: `Host has been  ${
        existHost.isVerified ? "verified" : "Unverified"
      }`,
      existHost,
     
    });
  } catch (error) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "server error while toggling verify status",
    });
  }
};

const editHost = async (req, res) => {
  try {
    const { id, name, email, mobile } = req.body;
    const existHost = await Host.findById(id);
    if (!existHost) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        success: false,
        message: "Host not found",
      });
    }

    if (name) existHost.name = name;
    if (email) existHost.email = email;
    if (mobile) existHost.mobile = mobile;
    await existHost.save();

    return res.status(STATUS_CODE.SUCCESS).json({
      success: true,
      message: "Host updated successfully",
      host: existHost,
    });
  } catch (error) {
    console.log("error editing Host ", (error = error.message));
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: " error editing Host ",
      error,
    });
  }
};

module.exports = {
  getAllHost,
  toggleBlockHost,
  toggleVerifyHost,
  editHost,
};
