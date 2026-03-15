const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({

   title:{
  type:String,
  required:true
 },

 description:{
  type:String,
  required:true
 },
  salary: Number,

 location:{
  type:String,
  required:true
 },
  experienceLevel: String,

  skillsRequired: [String],

  company:{
  type:String,
  required:true
 },

   status:{
  type:String,
  enum:["pending","approved","rejected"],
  default:"pending"
 },
  employer:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},{
  timestamps:true
})

module.exports = mongoose.model("Job", jobSchema)