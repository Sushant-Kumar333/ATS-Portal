const Company = require("../models/company");
const Job = require("../models/Job");
const Application = require("../models/Application");

// ===================================
// Recruiter Dashboard Statistics
// ===================================
exports.getDashboardStats = async (req, res) => {
  try {
    // Total Companies created by recruiter
    const companies = await Company.countDocuments({
      userId: req.user.id,
    });

    // Total Jobs created by recruiter
    const jobs = await Job.countDocuments({
      created_by: req.user.id,
    });

    // Recruiter's Jobs
    const recruiterJobs = await Job.find({
      created_by: req.user.id,
    }).select("_id");

    const jobIds = recruiterJobs.map((job) => job._id);

    // Total Applications on recruiter's jobs
    const applicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    // Accepted Applications
    const accepted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "accepted",
    });
   const pending = await Application.countDocuments({
  job: { $in: jobIds },
  status: "pending",
});

const rejected = await Application.countDocuments({
  job: { $in: jobIds },
  status: "rejected",
});

    // Recent Jobs
    const recentJobs = await Job.find({
      created_by: req.user.id,
    })
      .populate("company")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Applications
    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("applicant", "-password")
      .populate("job")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,

      stats: {
  companies,
  jobs,
  applicants,
  accepted,
  pending,
  rejected,
},

      recentJobs,
      recentApplications,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};