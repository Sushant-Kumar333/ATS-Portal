const Application = require("../models/Application");
const Job = require("../models/Job");
const Company = require("../models/Company");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");


// ==========================
// Apply Job
// ==========================
exports.applyJob = async (req, res) => {
  try {
    
    const userId = req.user.id;
    const jobId = req.params.id;

    const alreadyApplied = await Application.findOne({
      applicant: userId,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Already Applied",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const application = await Application.create({
      applicant: userId,
      job: jobId,
    });

    job.applications.push(application._id);
    await job.save();
    await Notification.create({
  recipient: job.created_by,
  sender: userId,
  title: "New Job Application",
  message: "A student has applied for your job.",
  type: "application",
});

    return res.status(201).json({
      success: true,
      message: "Applied Successfully",
      application,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// My Applications
// ==========================
exports.getAppliedJobs = async (req, res) => {
  try {

    const applications = await Application.find({
      applicant: req.user.id,
    }).populate({
      path: "job",
      populate: {
        path: "company",
      },
    });

    return res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Applied Job IDs
// ==========================
exports.getAppliedJobIds = async (req, res) => {
  try {

    const applications = await Application.find({
      applicant: req.user.id,
    }).select("job");

    const appliedJobs = applications.map((app) =>
      app.job.toString()
    );

    return res.status(200).json({
      success: true,
      appliedJobs,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Recruiter Applicants
// ==========================
exports.getApplicants = async (req, res) => {
  try {

    const applications = await Application.find({
      job: req.params.id,
    })
      .populate(
        "applicant",
        "fullname email phoneNumber profile"
      )
      .populate(
        "job",
        "title location salary jobType"
      );

    return res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Update Application Status
// ==========================
exports.updateStatus = async (req, res) => {
  try {

    const { status } = req.body;
        // Status Validation
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }
    

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();
    await Notification.create({
  recipient: application.applicant,
  sender: req.user.id,

  title:
    status === "accepted"
      ? "Application Accepted"
      : "Application Rejected",

  message:
    status === "accepted"
      ? "Congratulations! Your application has been accepted."
      : "Sorry! Your application has been rejected.",

  type: status,
});
// Send Email
const student = await User.findById(application.applicant);

await sendEmail(
  student.email,
  "Application Status",
  status === "accepted"
    ? `Hello ${student.fullname},

Congratulations! 🎉

Your application has been ACCEPTED.

We will contact you soon regarding the interview process.

Best Regards,
ATS Portal`
    : `Hello ${student.fullname},

We regret to inform you that your application has been REJECTED.

Don't lose hope. Keep applying and improving your skills.

Best Regards,
ATS Portal`
);

    return res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      application,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Dashboard Analytics
// ==========================
// ==========================
// Dashboard Stats
// ==========================
exports.getDashboard = async (req, res) => {
  try {

    // Total Companies
    const totalCompanies = await Company.countDocuments({
      userId: req.user.id,
    });

    // Recruiter Jobs
    const recruiterJobs = await Job.find({
      created_by: req.user.id,
    }).populate("company");

    const totalJobs = recruiterJobs.length;

    const jobIds = recruiterJobs.map(job => job._id);

    // Applications
    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate("applicant", "fullname")
      .populate("job", "title");

    const totalApplications = applications.length;

    const accepted = applications.filter(
      app => app.status === "accepted"
    ).length;

    const pending = applications.filter(
      app => app.status === "pending"
    ).length;

    const rejected = applications.filter(
      app => app.status === "rejected"
    ).length;

    const recentJobs = recruiterJobs.slice(-5).reverse();

    const recentApplications = applications
      .slice(-5)
      .reverse();

    return res.status(200).json({
      success: true,

      stats: {
        companies: totalCompanies,
        jobs: totalJobs,
        applicants: totalApplications,
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
