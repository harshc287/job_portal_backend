const Company = require("../models/Company")

exports.createCompany = async(req,res)=>{

 try{

 const company = await Company.create({
   ...req.body,
   owner:req.user._id
 })

 res.status(201).json(company)

 }catch(err){
  res.status(500).json({error:err.message})
 }

}

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("owner", "name email")

    res.json(companies)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id)

  if (!company) {
    return res.status(404).json({ message: "Company not found" })
  }

  res.json(company)
}

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

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)

    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }

    // 🔐 ONLY OWNER
    if (company.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updated = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updated)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)

    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }

    // 🔐 OWNER OR ADMIN
    if (
      company.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await company.deleteOne()

    res.json({ message: "Company deleted" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}