const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");

const {
  createJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Create Job
router.post("/create", protect, createJob);

// Recruiter Jobs
router.get("/admin", protect, getAdminJobs);

// All Jobs
router.get("/get", protect, getAllJobs);

// Single Job
router.get("/get/:id", protect, getJobById);

// Update Job
router.put("/update/:id", protect, updateJob);

// Delete Job
router.delete("/delete/:id", protect, deleteJob);


module.exports = router;