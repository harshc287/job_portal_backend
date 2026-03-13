const Application = require("../models/Application")

exports.applyJob = async (req,res)=>{

 try{

 const existing = await Application.findOne({
  userId:req.user._id,
  jobId:req.params.jobId
 })

 if(existing){
  return res.status(400).json({message:"Already applied"})
 }

 const application = await Application.create({
  userId:req.user._id,
  jobId:req.params.jobId,
  resume:req.body.resume
 })

 res.json(application)

 }catch(err){

 res.status(500).json({error:err.message})

 }

}

exports.myApplications = async(req,res)=>{

 const apps = await Application.find({
  userId:req.user._id
 }).populate("jobId")

 res.json(apps)

}

