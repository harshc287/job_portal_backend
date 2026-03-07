const Application = require("../models/Application")

exports.applyJobService = async(userId,jobId,resume)=>{

 const application = await Application.create({

  userId,
  jobId,
  resume

 })

 return application

}


exports.getApplicationsByJob = async(jobId)=>{

 const applications = await Application.find({
   jobId
 }).populate("userId","name email")

 return applications

}


exports.getMyApplications = async(userId)=>{

 const applications = await Application.find({
   userId
 }).populate("jobId")

 return applications

}