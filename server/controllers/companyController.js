const Company = require("../models/company");

// ======================
// Create Company
// ======================
exports.createCompany = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Company name is required"
            });
        }

        const company = await Company.findOne({ name });

        if (company) {
            return res.status(400).json({
                success: false,
                message: "Company already exists"
            });
        }

        const newCompany = await Company.create({
            name,
            userId: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: "Company Created Successfully",
            company: newCompany
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ======================
// Get All Companies
// ======================
exports.getCompanies = async (req, res) => {
    try {

        const companies = await Company.find({
            userId: req.user.id
        });

        return res.status(200).json({
            success: true,
            companies
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ======================
// Get Company By ID
// ======================
exports.getCompanyById = async (req, res) => {
    try {

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            company
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ======================
// Update Company
// ======================
exports.updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const company = await Company.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    if (req.file) {
      company.logo = "/uploads/companyLogo/" + req.file.filename;
    }

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company Updated Successfully",
      company,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================
// Delete Company
// ======================
exports.deleteCompany = async (req, res) => {
    try {

        const company = await Company.findByIdAndDelete(req.params.id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company Deleted Successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};