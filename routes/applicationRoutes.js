const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  applyJob,
  myApplications,
  withdrawApplication
} = require("../controllers/applicationController");

router.post("/apply/:jobId", protect, applyJob);

router.get("/my", protect, myApplications);

router.delete("/withdraw/:id", protect, withdrawApplication);

module.exports = router;
