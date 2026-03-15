const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const roleCheck = require("../middleware/roleMiddleware")

const {
 getDashboardStats,
 getAllUsers,
 deleteUser,
 deleteJobAdmin,

 toggleBanUser,
 changeUserRole,
 getAllJobs,
 getApplications,
 getAnalytics,
 getPendingJobs,
 approveJob,
 rejectJob,
 getPlatformActivity
} = require("../controllers/adminController")



router.get("/stats", protect, roleCheck("admin"), getDashboardStats)

router.get("/users", protect, roleCheck("admin"), getAllUsers)

router.delete("/users/:id", protect, roleCheck("admin"), deleteUser)

router.delete("/jobs/:id", protect, roleCheck("admin"), deleteJobAdmin)


router.patch("/users/:id/ban", protect, roleCheck("admin"), toggleBanUser)
router.patch("/users/:id/role", protect, roleCheck("admin"), changeUserRole)
router.get("/jobs", protect, roleCheck("admin"), getAllJobs)
router.get("/applications", protect, roleCheck("admin"), getApplications)
router.get("/analytics", protect, roleCheck("admin"), getAnalytics)


router.get("/jobs/pending", protect, roleCheck("admin"), getPendingJobs)

router.patch("/jobs/:id/approve", protect, roleCheck("admin"), approveJob)

router.patch("/jobs/:id/reject", protect, roleCheck("admin"), rejectJob)
router.get("/activity", protect, roleCheck("admin"), getPlatformActivity)

module.exports =  router