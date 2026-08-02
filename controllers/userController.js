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
        resource_type: "raw"
        
      }
    )

    const user = await User.findById(req.user._id)

    // store correct cloudinary URL
    user.resume = result.secure_url.replace("/upload/", "/upload/fl_attachment/")

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
// exports.updateProfile = async (req, res) => {

//   try {

//     const user = await User.findById(req.user._id)

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found"
//       })
//     }

//     user.name = req.body.name || user.name
//     user.skills = req.body.skills || user.skills

//     const updatedUser = await user.save()

//     res.json(updatedUser)

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     })

//   }

// }

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

  if(!user.experience){
  user.experience = []
 }

 user.experience.push(req.body)
console.log(req.body)
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

   if(!user.education){
    user.education = []
  }

 user.education.push(req.body)
console.log(req.body)

 await user.save()

 res.json(user.education)

 }catch(error){

  res.status(500).json({
   message:error.message
  })

 }

}

// controllers/userController.js

// ... (existing code)

// UPDATE entire profile (name, email, skills, etc.)
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Allow updating these fields
    const { name, email, skills, bio, phone } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (skills) user.skills = skills;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a single experience entry
exports.updateExperience = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const expIndex = user.experience.findIndex(
      (exp) => exp._id.toString() === req.params.id
    );
    if (expIndex === -1) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Update only the fields that are sent
    const { company, position, startDate, endDate, description } = req.body;
    if (company) user.experience[expIndex].company = company;
    if (position) user.experience[expIndex].position = position;
    if (startDate) user.experience[expIndex].startDate = startDate;
    if (endDate) user.experience[expIndex].endDate = endDate;
    if (description) user.experience[expIndex].description = description;

    await user.save();
    res.json(user.experience[expIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a single experience entry
exports.deleteExperience = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.experience = user.experience.filter(
      (exp) => exp._id.toString() !== req.params.id
    );
    await user.save();
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a single education entry
exports.updateEducation = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const eduIndex = user.education.findIndex(
      (edu) => edu._id.toString() === req.params.id
    );
    if (eduIndex === -1) {
      return res.status(404).json({ message: 'Education not found' });
    }

    const { institution, degree, fieldOfStudy, startYear, endYear } = req.body;
    if (institution) user.education[eduIndex].institution = institution;
    if (degree) user.education[eduIndex].degree = degree;
    if (fieldOfStudy) user.education[eduIndex].fieldOfStudy = fieldOfStudy;
    if (startYear) user.education[eduIndex].startYear = startYear;
    if (endYear) user.education[eduIndex].endYear = endYear;

    await user.save();
    res.json(user.education[eduIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a single education entry
exports.deleteEducation = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.education = user.education.filter(
      (edu) => edu._id.toString() !== req.params.id
    );
    await user.save();
    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};