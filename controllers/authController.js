const User = require("../models/User")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

exports.register = async(req,res)=>{

 try{

 const {name,email,password,role} = req.body


 const userExists = await User.findOne({email})

 if(userExists){
  return res.status(400).json({message:"User exists"})
 }

 const user = await User.create({
  name,
  email,
  password,
  role
 })

 res.json({
  _id:user._id,
  name:user.name,
  email:user.email,
  role:user.role,
  token:generateToken(user._id)
 })

 }catch(error){
  console.error("Register Error:", error)
  res.status(500).json({error:error.message})
 }

}

exports.login = async(req,res)=>{

 const {email,password} = req.body

 const user = await User.findOne({email})

 if(user && await bcrypt.compare(password,user.password)){
   res.json({
     _id:user._id,
     name:user.name,
     email:user.email,
     role:user.role,
     token:generateToken(user._id)
   })
 }else{
   res.status(401).json({message:"Invalid credentials"})
 }

}