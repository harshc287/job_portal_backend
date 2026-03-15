const User = require("../models/User")
const Job = require("../models/Job")
const Application = require("../models/Application")



/* ===============================
   Dashboard Stats
================================*/

exports.getDashboardStats = async(req,res)=>{

 try{

  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  const applications = await Application.countDocuments()

  res.json({
   users,
   jobs,
   applications
  })

 }catch(error){
  res.status(500).json({message:error.message})
 }

}



/* ===============================
   Get All Users
================================*/

exports.getAllUsers = async(req,res)=>{
 try{

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const search = req.query.search || ""

  const query = {
   $or:[
    {name:{$regex:search,$options:"i"}},
    {email:{$regex:search,$options:"i"}}
   ]
  }

  const total = await User.countDocuments(query)

  const users = await User
   .find(query)
   .select("-password")
   .skip((page-1)*limit)
   .limit(limit)

  res.json({
   users,
   totalPages:Math.ceil(total/limit)
  })

 }catch(error){
  res.status(500).json({
   message:error.message
  })
 }
}



/* ===============================
   Delete User
================================*/

exports.deleteUser = async(req,res)=>{

 try{

  if(req.user._id.toString() === req.params.id){
   return res.status(400).json({
    message:"Admin cannot delete himself"
   })
  }

  await User.findByIdAndDelete(req.params.id)

  res.json({
   message:"User deleted successfully"
  })

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}



/* ===============================
   Ban / Unban User
================================*/

exports.toggleBanUser = async(req,res)=>{

 try{

  const user = await User.findById(req.params.id)

  if(!user){
   return res.status(404).json({
    message:"User not found"
   })
  }

  user.isBanned = !user.isBanned

  await user.save()

  res.json(user)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}



/* ===============================
   Change User Role
================================*/

exports.changeUserRole = async(req,res)=>{

 try{

  const user = await User.findById(req.params.id)

  if(!user){
   return res.status(404).json({
    message:"User not found"
   })
  }

  user.role = req.body.role

  await user.save()

  res.json(user)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}



/* ===============================
   Get All Jobs
================================*/

exports.getAllJobs = async(req,res)=>{
 try{

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  const total = await Job.countDocuments()

  const jobs = await Job
   .find()
   .skip((page-1)*limit)
   .limit(limit)

  res.json({
   jobs,
   totalPages:Math.ceil(total/limit)
  })

 }catch(error){
  res.status(500).json({
   message:error.message
  })
 }
}



/* ===============================
   Delete Job
================================*/

exports.deleteJobAdmin = async(req,res)=>{

 try{

  await Job.findByIdAndDelete(req.params.id)

  res.json({
   message:"Job deleted by admin"
  })

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}




/* ===============================
   Analytics
================================*/

exports.getAnalytics = async(req,res)=>{

 try{

  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  const applications = await Application.countDocuments()

  res.json({
   users,
   jobs,
   applications
  })

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

exports.approveJob = async(req,res)=>{

 try{

  const job = await Job.findById(req.params.id)

  if(!job){
   return res.status(404).json({
    message:"Job not found"
   })
  }

  job.status = "approved"

  await job.save()

  res.json({
   message:"Job approved",
   job
  })

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

exports.rejectJob = async(req,res)=>{

 try{

  const job = await Job.findById(req.params.id)

  if(!job){
   return res.status(404).json({
    message:"Job not found"
   })
  }

  job.status = "rejected"

  await job.save()

  res.json({
   message:"Job rejected",
   job
  })

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

exports.getPendingJobs = async(req,res)=>{

 try{

const page = parseInt(req.query.page) || 1
const limit = parseInt(req.query.limit) || 10

const query = {status:"pending"}

const total = await Job.countDocuments(query)

const jobs = await Job
 .find(query)
 .skip((page-1)*limit)
 .limit(limit)

res.json({
 jobs,
 totalPages:Math.ceil(total/limit)
})

  res.json(jobs)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

/* ===============================
   Get All Applications
================================*/

exports.getApplications = async(req,res)=>{
 try{

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  const total = await Application.countDocuments()

  const applications = await Application
   .find()
   .populate("userId","name email")
   .populate("jobId","title company")
   .skip((page-1)*limit)
   .limit(limit)

  res.json({
   applications,
   totalPages:Math.ceil(total/limit)
  })

 }catch(error){
  res.status(500).json({
   message:error.message
  })
 }
}

exports.getPlatformActivity = async(req,res)=>{

 try{

  const today = new Date()
  const last7days = new Date()

  last7days.setDate(today.getDate() - 7)

  const newUsers = await User.countDocuments({
   createdAt:{ $gte:last7days }
  })

  const newJobs = await Job.countDocuments({
   createdAt:{ $gte:last7days }
  })

  const newApplications = await Application.countDocuments({
   createdAt:{ $gte:last7days }
  })

  res.json({
   newUsers,
   newJobs,
   newApplications
  })

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}