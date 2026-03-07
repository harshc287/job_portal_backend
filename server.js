const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const jobRoutes = require("./routes/jobRoutes")
const applicationRoutes = require("./routes/applicationRoutes")
const userRoutes = require("./routes/userRoutes")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

require("./config/db")

app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})