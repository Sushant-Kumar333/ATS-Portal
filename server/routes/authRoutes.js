const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
  updateProfile,
} = require("../controllers/authController");

const protect = require("../middleware/protect");
const upload = require("../middleware/multer");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, profile);

router.put(
  "/profile/update",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;