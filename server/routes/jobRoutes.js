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

router.post("/create", protect, createJob);
router.get("/get", getAllJobs);
router.get("/getadminjobs", protect, getAdminJobs);
router.get("/:id", getJobById);
router.put("/update/:id", protect, updateJob);
router.delete("/delete/:id", protect, deleteJob);

module.exports = router;