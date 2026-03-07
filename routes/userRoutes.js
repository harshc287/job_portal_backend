const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")

// middleware
const uploadProfilePhotoMiddleware = require("../utils/uploadProfilePhoto")
const uploadResume = require("../utils/uploadResume")

// controllers
const {
 getProfile,
 uploadResumeController,
 uploadProfilePhoto,
 addExperience,
 addEducation
} = require("../controllers/userController")

router.get("/profile", protect, getProfile)

router.post(
 "/upload-resume",
 protect,
 uploadResume.single("resume"),
 uploadResumeController
)

router.post(
 "/upload-photo",
 protect,
 uploadProfilePhotoMiddleware.single("photo"),
 uploadProfilePhoto
)

router.post("/experience", protect, addExperience)

router.post("/education", protect, addEducation)

module.exports = router