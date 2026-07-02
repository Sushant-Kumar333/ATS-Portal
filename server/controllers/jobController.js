const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      jobType,
      position,
      company,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !experience ||
      !jobType ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((item) => item.trim()),
      salary,
      location,
      experience,
      jobType,
      position,
      company,
      created_by: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { keyword = "", location = "", jobType = "" } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Recruiter Jobs
exports.getAdminJobs = async (req, res) => {
  try {

    console.log("===============");
    console.log("req.user =", req.user);

    const jobs = await Job.find()
      .populate("company")
      .populate("created_by");

    console.log("All Jobs =", jobs);

    return res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

// Get Job By Id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};