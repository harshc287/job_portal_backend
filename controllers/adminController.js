const User = require("../models/User")
const Job = require("../models/Job")
const Application = require("../models/Application")

exports.getDashboardStats = async(req,res)=>{

 const users = await User.countDocuments()
 const jobs = await Job.countDocuments()
 const applications = await Application.countDocuments()

 res.json({
   users,
   jobs,
   applications
 })

}

exports.getAllUsers = async(req,res)=>{

 const users = await User.find().select("-password")

 res.json(users)

}

exports.deleteUser = async(req,res)=>{

 await User.findByIdAndDelete(req.params.id)

 res.json({message:"User deleted"})

}

exports.deleteJobAdmin = async(req,res)=>{

 await Job.findByIdAndDelete(req.params.id)

 res.json({message:"Job deleted by admin"})

}
