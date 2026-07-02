const User = require("../models/User");

// ==========================
// Get Profile
// ==========================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Update Profile
// ==========================

exports.updateProfile = async (req, res) => {
  try {
    console.log("BODY :", req.body);
    console.log("FILES :", req.files);

    const {
      fullname,
      phoneNumber,
      bio,
      skills,
      education,
      experience,
      github,
      linkedin,
      portfolio,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Basic Details
    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (!user.profile) {
      user.profile = {};
    }

    if (bio) user.profile.bio = bio;

    if (skills) {
      user.profile.skills = skills
        .split(",")
        .map((item) => item.trim());
    }

    if (education) user.profile.education = education;
    if (experience) user.profile.experience = experience;
    if (github) user.profile.github = github;
    if (linkedin) user.profile.linkedin = linkedin;
    if (portfolio) user.profile.portfolio = portfolio;

    // Resume Upload
    if (req.files && req.files.resume) {
      user.profile.resume =
        "/uploads/resumes/" + req.files.resume[0].filename;

      user.profile.resumeOriginalName =
        req.files.resume[0].originalname;
    }

    // Profile Photo Upload
    if (req.files && req.files.profilePhoto) {
      user.profile.profilePhoto =
        "/uploads/profile/" + req.files.profilePhoto[0].filename;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
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
// ==========================
// Upload Resume
// ==========================
exports.uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No Resume Uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.profile) {
      user.profile = {};
    }

    user.profile.resume = `/uploads/resumes/${req.file.filename}`;
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

// ==========================
// Upload Profile Photo
// ==========================
exports.uploadProfilePhoto = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No Image Uploaded",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.profile) {
      user.profile = {};
    }

    user.profile.profilePhoto = `/uploads/profile/${req.file.filename}`;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Photo Uploaded Successfully",
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