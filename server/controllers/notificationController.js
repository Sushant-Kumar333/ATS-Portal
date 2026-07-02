const Notification = require("../models/Notification");

// =============================
// Get Notifications
// =============================
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("sender", "fullname")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Mark Notification as Read
// =============================
exports.markAsRead = async (req, res) => {
  try {

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification Marked as Read",
      notification,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =============================
// Delete Notification
// =============================
exports.deleteNotification = async (req, res) => {

  try {

    const notification = await Notification.findByIdAndDelete(
      req.params.id
    );

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification Not Found",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Notification Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};