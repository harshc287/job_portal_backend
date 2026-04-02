const Company = require("../models/Company")

// CREATE COMPANY
exports.createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      location,
      logo,
      industry,
      size,
      foundedYear
    } = req.body

    // ✅ Basic validation
    if (!name) {
      return res.status(400).json({ message: "Company name is required" })
    }

    const company = await Company.create({
      name,
      description,
      website,
      location,
      logo,
      industry,
      size,
      foundedYear,
      owner: req.user._id
    })

    res.status(201).json(company)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// GET ALL COMPANIES
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("owner", "name email")

    res.json(companies)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// GET SINGLE COMPANY
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate("owner", "name email")

    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }

    res.json(company)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// GET MY COMPANIES (EMPLOYER)
exports.getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      owner: req.user._id
    })

    res.json(companies)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// UPDATE COMPANY
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)

    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }

    // 🔐 Only owner
    if (company.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        website: req.body.website,
        location: req.body.location,
        logo: req.body.logo,
        industry: req.body.industry,
        size: req.body.size,
        foundedYear: req.body.foundedYear
      },
      { new: true }
    )

    res.json(updatedCompany)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// DELETE COMPANY
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)

    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }

    // 🔐 Owner or Admin
    if (
      company.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await company.deleteOne()

    res.json({ message: "Company deleted successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}