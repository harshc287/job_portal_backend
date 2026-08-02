const Application = require("../models/Application");

exports.applyJob = async (req, res) => {
  try {
    const existing = await Application.findOne({
      userId: req.user._id,
      jobId: req.params.jobId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      userId: req.user._id,
      jobId: req.params.jobId,
      resume: req.body.resume,
    });

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.myApplications = async (req, res) => {
  const apps = await Application.find({
    userId: req.user._id,
  }).populate("jobId");

  res.json(apps);
};

exports.withdrawApplication = async (req, res) => {
  try {
    console.log("Application ID:", req.params.id);
    console.log("User ID:", req.user._id);

    const byId = await Application.findById(req.params.id);

    console.log("Application by ID:", byId);

    const application = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    console.log("Application with user:", application);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    await application.deleteOne();

    res.json({
      message: "Application withdrawn successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};
