const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

// middleware
const uploadProfilePhotoMiddleware = require("../utils/uploadProfilePhoto");
const uploadResume = require("../utils/uploadResume");

// controllers
const {
  getProfile,
  uploadResumeController,
  uploadProfilePhoto,
  addExperience,
  addEducation,
  updateExperience,
  deleteExperience,
  updateEducation,
  deleteEducation,
  updateProfile
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.put('/profile', protect, updateProfile);


router.post(
  "/upload-resume",
  protect,
  uploadResume.single("resume"),
  uploadResumeController,
);

router.post(
  "/upload-photo",
  protect,
  uploadProfilePhotoMiddleware.single("photo"),
  uploadProfilePhoto,
);

router.post("/experience", protect, addExperience);

router.post("/education", protect, addEducation);

// Experience routes
router.put("/experience/:id", protect, updateExperience);
router.delete("/experience/:id", protect, deleteExperience);

// Education routes
router.put("/education/:id", protect, updateEducation);
router.delete("/education/:id", protect, deleteEducation);

module.exports = router;
