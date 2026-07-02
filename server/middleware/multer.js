const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadRoot = path.join(__dirname, "../uploads");
const resumePath = path.join(uploadRoot, "resumes");
const profilePath = path.join(uploadRoot, "profile");

// Create folders if not exist
if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

if (!fs.existsSync(resumePath)) {
  fs.mkdirSync(resumePath, { recursive: true });
}

if (!fs.existsSync(profilePath)) {
  fs.mkdirSync(profilePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") {
      cb(null, resumePath);
    } else if (file.fieldname === "profilePhoto") {
      cb(null, profilePath);
    } else {
      cb(new Error("Invalid field"));
    }
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    const allowedResume = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedResume.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Only PDF/DOC/DOCX allowed"));
  }

  if (file.fieldname === "profilePhoto") {
    const allowedImages = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowedImages.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Only JPG/JPEG/PNG/WEBP allowed"));
  }

  return cb(new Error("Invalid File"));
};

module.exports = multer({
  storage,
  fileFilter,
});