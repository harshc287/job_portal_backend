const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const roleCheck = require("../middleware/roleMiddleware")

const {
 getDashboardStats,
 getAllUsers,
 deleteUser,
 deleteJobAdmin
} = require("../controllers/adminController")



router.get("/stats", protect, roleCheck("admin"), getDashboardStats)

router.get("/users", protect, roleCheck("admin"), getAllUsers)

router.delete("/users/:id", protect, roleCheck("admin"), deleteUser)

router.delete("/jobs/:id", protect, roleCheck("admin"), deleteJobAdmin)

module.exports =  router