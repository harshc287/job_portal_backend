const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")

const {
 applyJob,
 myApplications
} = require("../controllers/applicationController")

router.post("/apply/:jobId", protect, applyJob)

router.get("/my", protect, myApplications)

module.exports = router