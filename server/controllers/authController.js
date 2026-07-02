const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// Register
// ======================
exports.register = async (req, res) => {
    console.log("BODY:", req.body);

  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================
// Login
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================
// Get Profile
// ======================
exports.profile = async (req, res) => {
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

// ======================
// Update Profile + Resume Upload
// ======================
exports.updateProfile = async (req, res) => {
   console.log("========== UPDATE ==========");
  console.log("BODY =>", req.body);
  console.log("FILES =>", req.files);
  try {
    console.log("========== UPDATE PROFILE ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    // baaki code...
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

    // Profile Object
    if (!user.profile) {
      user.profile = {};
    }

    user.profile.bio = bio || "";

    user.profile.skills = skills
      ? skills.split(",").map((item) => item.trim())
      : [];
      if (education) user.profile.education = education;

if (experience) user.profile.experience = experience;

if (github) user.profile.github = github;

if (linkedin) user.profile.linkedin = linkedin;

if (portfolio) user.profile.portfolio = portfolio;
    
   // Resume Upload
if (req.files?.resume) {
  user.profile.resume = req.files.resume[0].path;
  user.profile.resumeOriginalName =
    req.files.resume[0].originalname;
}

// Profile Photo Upload
if (req.files?.profilePhoto) {
  user.profile.profilePhoto =
    req.files.profilePhoto[0].path;
}

   

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};