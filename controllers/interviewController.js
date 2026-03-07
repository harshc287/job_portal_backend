const Interview = require("../models/interview")

exports.scheduleInterview = async(req,res)=>{

 try{

 const interview = await Interview.create({

   applicationId:req.body.applicationId,
   candidate:req.body.candidate,
   employer:req.user._id,
   date:req.body.date,
   meetingLink:req.body.meetingLink

 })

 res.json(interview)

 }catch(err){
   res.status(500).json({error:err.message})
 }

}

exports.getMyInterviews = async(req,res)=>{

 const interviews = await Interview.find({
   candidate:req.user._id
 }).populate("employer","name")

 res.json(interviews)

}