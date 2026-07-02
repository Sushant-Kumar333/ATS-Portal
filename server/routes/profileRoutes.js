const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const upload = require("../middleware/multer");

const profileController = require("../controllers/profileController");

// Get Profile
router.get("/", protect, profileController.getProfile);

// Update Profile
router.put(
  "/update",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  profileController.updateProfile
);

module.exports = router;