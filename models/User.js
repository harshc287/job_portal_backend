const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    unique:true,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  role:{
    type:String,
    enum:["jobseeker","employer","admin"],
    default:"jobseeker"
  },

  skills:[String],

  resume:String,

  profilePhoto:String,

  experience:[
    {
      company:String,
      position:String,
      startDate:Date,
      endDate:Date,
      description:String
    }
  ],

  education:[
    {
      institution:String,
      degree:String,
      fieldOfStudy:String,
      startYear:Number,
      endYear:Number
    }
  ]

},{timestamps:true})


userSchema.pre("save", async function(next){

  if(!this.isModified("password")) return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})


module.exports = mongoose.model("User", userSchema)