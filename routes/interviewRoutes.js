const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const roleCheck = require("../middleware/roleMiddleware")

const {
 scheduleInterview,
 getMyInterviews
} = require("../controllers/interviewController")

router.post("/schedule", protect, roleCheck("employer"), scheduleInterview)

router.get("/my", protect, getMyInterviews)

module.exports = router