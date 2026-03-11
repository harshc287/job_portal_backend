const User = require("../models/User")
const cloudinary = require("../config/cloudinary")
const fs = require("fs")

/*
GET USER PROFILE
*/
exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password")

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    res.json(user)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


/*
UPLOAD RESUME
*/
exports.uploadResumeController = async (req, res, next) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      })
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "raw",
        folder: "resumes"
      }
    )

    const user = await User.findById(req.user._id)

    // store correct cloudinary URL
    user.resume = result.secure_url

    await user.save()

    fs.unlinkSync(req.file.path)

    res.json({
      message: "Resume uploaded successfully",
      resume: result.secure_url
    })

  } catch (error) {
    next(error)
  }

}


/*
UPDATE USER PROFILE
*/
exports.updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    user.name = req.body.name || user.name
    user.skills = req.body.skills || user.skills

    const updatedUser = await user.save()

    res.json(updatedUser)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

exports.uploadProfilePhoto = async(req,res)=>{

 try{

 if(!req.file){
  return res.status(400).json({
   message:"No image uploaded"
  })
 }

 const result = await cloudinary.uploader.upload(
  req.file.path
 )

 const user = await User.findById(req.user._id)

 user.profilePhoto = result.secure_url

 await user.save()

 res.json({
  message:"Profile photo uploaded",
  profilePhoto:user.profilePhoto
 })

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

exports.addExperience = async(req,res)=>{

 try{

 const user = await User.findById(req.user._id)

 user.experience.push(req.body)

 await user.save()

 res.json(user.experience)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

exports.addEducation = async(req,res)=>{

 try{

 const user = await User.findById(req.user._id)

 user.education.push(req.body)

 await user.save()

 res.json(user.education)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}