const Job = require("../models/Job")

exports.createJobService = async(data,userId)=>{

 const job = await Job.create({
   ...data,
   postedBy:userId
 })

 return job

}

exports.getJobsService = async(filters)=>{

 const query = {}

 if(filters.keyword){
   query.title = {$regex:filters.keyword,$options:"i"}
 }

 if(filters.location){
   query.location = filters.location
 }

 if(filters.salary){
   query.salary = {$gte:filters.salary}
 }

 const jobs = await Job.find(query).sort({createdAt:-1})

 return jobs

}
exports.deleteJobService = async(jobId)=>{

 const job = await Job.findByIdAndDelete(jobId)

 return job

}