const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  salary: Number,
  location: String,
  experienceLevel: String,
  skillsRequired: [String],
  company: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},{
  timestamps:true
})

module.exports = mongoose.model("Job", jobSchema)