const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");

const {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
  getAppliedJobIds,
} = require("../controllers/applicationController");

// Apply Job
router.post("/apply/:id", protect, applyJob);

// Current User Applications
router.get("/my", protect, getAppliedJobs);

// Applied Job IDs
router.get("/applied", protect, getAppliedJobIds);

// Recruiter Applicants
router.get("/applicants/:id", protect, getApplicants);

// Update Application Status
router.put("/status/:id", protect, updateStatus);

module.exports = router;