const mongoose = require("mongoose")

const interviewSchema = new mongoose.Schema({

  applicationId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Application"
  },

  candidate:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  employer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  date:Date,

  meetingLink:String,

  status:{
    type:String,
    default:"Scheduled"
  }

},{
 timestamps:true
})

module.exports = mongoose.model("Interview",interviewSchema)