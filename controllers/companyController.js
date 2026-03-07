const Company = require("../models/Company")

exports.createCompany = async(req,res)=>{

 try{

 const company = await Company.create({
   ...req.body,
   owner:req.user._id
 })

 res.json(company)

 }catch(err){
  res.status(500).json({error:err.message})
 }

}

exports.getCompanies = async(req,res)=>{

 const companies = await Company.find().populate("owner","name email")

 res.json(companies)

}

exports.getCompanyById = async(req,res)=>{

 const company = await Company.findById(req.params.id)

 res.json(company)

}

exports.updateCompany = async(req,res)=>{

 const company = await Company.findByIdAndUpdate(
  req.params.id,
  req.body,
  {new:true}
 )

 res.json(company)

}

exports.deleteCompany = async(req,res)=>{

 await Company.findByIdAndDelete(req.params.id)

 res.json({message:"Company deleted"})

}