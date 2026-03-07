const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const roleCheck = require("../middleware/roleMiddleware")

const {
 createCompany,
 getCompanies,
 getCompanyById,
 updateCompany,
 deleteCompany
} = require("../controllers/companyController")

router.post("/", protect, roleCheck("employer"), createCompany)

router.get("/", getCompanies)

router.get("/:id", getCompanyById)

router.put("/:id", protect, roleCheck("employer"), updateCompany)

router.delete("/:id", protect, roleCheck("admin"), deleteCompany)

module.exports = router