// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const helmet = require("helmet")
// const rateLimit = require("express-rate-limit")
// require("dotenv").config()

// const authRoutes = require("./src/routes/auth")
// const resumeRoutes = require("./src/routes/resumes")
// const templateRoutes = require("./src/routes/templates")
// const errorHandler = require("./src/middleware/errorHandler")

// const app = express()

// // Security middleware
// app.use(helmet())
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   }),
// )

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// })
// app.use(limiter)

// // Body parsing middleware
// app.use(express.json({ limit: "10mb" }))
// app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// // Database connection
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cinecv", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err))

// // Routes
// app.use("/api/auth", authRoutes)
// app.use("/api/resumes", resumeRoutes)
// app.use("/api/templates", templateRoutes)

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "OK",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   })
// })

// // Error handling middleware
// app.use(errorHandler)

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({ message: "Route not found" })
// })

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`)
//   console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`)
// })

// module.exports = app














// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const helmet = require("helmet")
// const rateLimit = require("express-rate-limit")
// require("dotenv").config()

// const authRoutes = require("./src/routes/auth")
// const resumeRoutes = require("./src/routes/resumes")
// const templateRoutes = require("./src/routes/templates")
// const errorHandler = require("./src/middleware/errorHandler")

// const app = express()

// // Security middleware
// app.use(helmet())
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   }),
// )

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// })
// app.use(limiter)

// // Body parsing middleware
// app.use(express.json({ limit: "10mb" }))
// app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// // Database connection
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cinecv", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err))

// // Routes
// app.use("/api/auth", authRoutes)
// app.use("/api/resumes", resumeRoutes)
// app.use("/api/templates", templateRoutes)

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "OK",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   })
// })

// // Error handling middleware
// app.use(errorHandler)

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({ message: "Route not found" })
// })

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`)
//   console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`)
// })

// module.exports = app




















const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// Import routes
const authRoutes = require("./src/routes/auth")
const resumeRoutes = require("./src/routes/resumes")
const templateRoutes = require("./src/routes/templates")
const subscriptionRoutes = require("./src/routes/subscription")

// Import middleware
const errorHandler = require("./src/middleware/errorHandler")

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/resumes", resumeRoutes)
app.use("/api/templates", templateRoutes)
app.use("/api/subscription", subscriptionRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CineCV API is running",
    timestamp: new Date().toISOString(),
  })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cinecv", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB")
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  })

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`)
  console.log(`🔗 API URL: http://localhost:${PORT}/api`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...")
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.")
    process.exit(0)
  })
})
