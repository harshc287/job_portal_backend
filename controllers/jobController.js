const Job = require("../models/Job")

// ✅ CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, salary } = req.body

    if (!title || !company || !location) {
      return res.status(400).json({
        message: "Title, company and location are required"
      })
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary,
      employer: req.user._id,
      status: "pending" // 🔥 change to "approved" if needed
    })

    return res.status(201).json(job)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// ✅ GET ALL JOBS (FILTER + SEARCH + PAGINATION)
exports.getJobs = async (req, res) => {
  try {
    let query = { status: "approved" }

    // 🔍 Search
    if (req.query.keyword) {
      query.title = { $regex: req.query.keyword, $options: "i" }
    }

    // 📍 Location filter
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: "i" }
    }

    // 📄 Pagination
    const page = Number(req.query.page) || 1
    const limit = 6
    const skip = (page - 1) * limit

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit)

    return res.json(jobs)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// ✅ GET SINGLE JOB
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    return res.json(job)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// ✅ GET MY JOBS (EMPLOYER)
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      employer: req.user._id
    }).sort({ createdAt: -1 })

    return res.json(jobs)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// ✅ UPDATE JOB
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    // 🔐 Only owner
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    return res.json(updatedJob)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// ✅ DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    if (
      job.employer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await job.deleteOne()

    return res.json({ message: "Job removed" })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}