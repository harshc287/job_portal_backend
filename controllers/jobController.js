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

res.status(201).json(job)


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

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    // 🔐 Only owner or admin
    if (
      job.employer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await job.deleteOne()

    res.json({ message: "Job removed" })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// GET MY JOBS
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      employer: req.user._id   // 🔥 filter by logged-in user
    })

    res.json(jobs)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// UPDATE JOB
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    // 🔐 Only owner can update
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedJob)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}