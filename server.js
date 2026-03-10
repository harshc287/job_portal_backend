require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")
const errorHandler = require("./middleware/errorMiddleware")

const authRoutes = require("./routes/authRoutes")
const jobRoutes = require("./routes/jobRoutes")
const applicationRoutes = require("./routes/applicationRoutes")
const companyRoutes = require("./routes/companyRoutes")
const interviewRoutes = require("./routes/interviewRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/companies", companyRoutes)
app.use("/api/interviews", interviewRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})