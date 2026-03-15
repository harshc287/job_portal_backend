const Job = require("../models/Job")

exports.createJob = async(req,res)=>{

 try{

  const job = await Job.create({

   title:req.body.title,
   company:req.body.company,
   location:req.body.location,
   description:req.body.description,
   employer:req.user._id,
   status:"pending"

  })

  res.json(job)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

exports.getJobs = async(req,res)=>{

 try{

  const jobs = await Job.find({
   status:"approved"
  })

  res.json(jobs)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

exports.getJobById = async(req,res)=>{

 const job = await Job.findById(req.params.id)

 res.json(job)

}

exports.deleteJob = async(req,res)=>{

 await Job.findByIdAndDelete(req.params.id)

 res.json({message:"Job removed"})

}