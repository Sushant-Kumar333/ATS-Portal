require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoute = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const studentDashboardRoutes = require("./routes/studentDashboardRoutes");

const app = express();

// =============================
// Middlewares
// =============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =============================
// Routes
// =============================
app.use("/api/v1/user", authRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/student-dashboard", studentDashboardRoutes);

// =============================
// Test Route
// =============================
app.get("/", (req, res) => {
  res.send("ATS Backend Running");
});

// =============================
// Global Error Handler
// =============================
app.use((err, req, res, next) => {
  console.log("========= GLOBAL ERROR =========");
  console.log(err);

  return res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

// =============================
// MongoDB + Server
// =============================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });