const User = require("../models/User");
exports.uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const user = await User.findById(req.user.id);

    user.profile.resume = req.file.path;
    user.profile.resumeOriginalName = req.file.originalname;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume Uploaded Successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};