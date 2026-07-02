const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");

const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

// Create Company
router.post("/register", protect, createCompany);

// Get All Companies
router.get("/get", protect, getCompanies);

// Get Single Company
router.get("/get/:id", protect, getCompanyById);

// Update Company
const upload = require("../middleware/upload");

router.put(
  "/update/:id",
  protect,
  upload.single("logo"),
  updateCompany
);

// Delete Company
router.delete("/delete/:id", protect, deleteCompany);

module.exports = router;