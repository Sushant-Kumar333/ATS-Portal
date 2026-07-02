const express = require("express");

const router = express.Router();

const protect = require("../middleware/protect");

const {
  getStudentDashboard,
} = require("../controllers/studentDashboardController");

router.get("/", protect, getStudentDashboard);

module.exports = router;