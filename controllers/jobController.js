const Job = require("../models/Job")

exports.createJob = async(req,res)=>{

 try{

 const job = await Job.create({
  ...req.body,
  postedBy:req.user._id
 })

 res.json(job)

 }catch(err){
  res.status(500).json({error:err.message})
 }

}

exports.getJobs = async(req,res)=>{

 const jobs = await Job.find().populate("postedBy","name")

 res.json(jobs)

}

exports.getJobById = async(req,res)=>{

 const job = await Job.findById(req.params.id)

 res.json(job)

}

exports.deleteJob = async(req,res)=>{

 await Job.findByIdAndDelete(req.params.id)

 res.json({message:"Job removed"})

}