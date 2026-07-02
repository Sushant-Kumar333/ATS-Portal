const Application = require("../models/Application");

exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Total Applied Jobs
    const applied = await Application.countDocuments({
      applicant: studentId,
    });

    // Accepted Applications
    const accepted = await Application.countDocuments({
      applicant: studentId,
      status: "accepted",
    });

    // Pending Applications
    const pending = await Application.countDocuments({
      applicant: studentId,
      status: "pending",
    });

    // Rejected Applications
    const rejected = await Application.countDocuments({
      applicant: studentId,
      status: "rejected",
    });

    // Recent Applications
    const recentApplications = await Application.find({
      applicant: studentId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        applied,
        accepted,
        pending,
        rejected,
      },
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