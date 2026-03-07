const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const roleCheck = require("../middleware/roleMiddleware")

const {
 createJob,
 getJobs,
 getJobById,
 deleteJob
} = require("../controllers/jobController")

router.get("/", getJobs)
router.get("/:id", getJobById)

router.post("/", protect, roleCheck("employer"), createJob)

router.delete("/:id", protect, roleCheck("employer","admin"), deleteJob)

module.exports = router