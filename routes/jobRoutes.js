const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const roleCheck = require("../middleware/roleMiddleware")

const {
 createJob,
 getJobs,
 getJobById,
 deleteJob,
 getMyJobs,
  updateJob
} = require("../controllers/jobController")

router.get("/my", protect, roleCheck("employer"), getMyJobs) //  NEW

// ✅ Public routes
router.get("/", getJobs)
router.get("/:id", getJobById)

// ✅ Protected routes
router.post("/", protect, roleCheck("employer"), createJob)

router.delete("/:id", protect, roleCheck("employer","admin"), deleteJob)

router.put("/:id", protect, roleCheck("employer"), updateJob) //  NEW

module.exports = router