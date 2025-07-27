// const express = require("express")
// const { body } = require("express-validator")
// const authController = require("../controllers/authController")
// const auth = require("../middleware/auth")

// const router = express.Router()

// // Validation rules
// const signupValidation = [
//   body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
//   body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
//   body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
// ]

// const loginValidation = [
//   body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
//   body("password").notEmpty().withMessage("Password is required"),
// ]

// const verifyEmailValidation = [
//   body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
//   body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
// ]

// const resendOTPValidation = [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email")]

// const changePasswordValidation = [
//   body("currentPassword").notEmpty().withMessage("Current password is required"),
//   body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
// ]

// // Routes
// router.post("/signup", signupValidation, authController.signup)
// router.post("/verify-email", verifyEmailValidation, authController.verifyEmail)
// router.post("/resend-otp", resendOTPValidation, authController.resendOTP)
// router.post("/login", loginValidation, authController.login)
// router.get("/me", auth, authController.getMe)
// router.put("/profile", auth, authController.updateProfile)
// router.put("/change-password", auth, changePasswordValidation, authController.changePassword)

// module.exports = router















const express = require("express")
const { body } = require("express-validator")
const authController = require("../controllers/authController")
const auth = require("../middleware/auth")

const router = express.Router()

// Validation rules
const signupValidation = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

const verifyEmailValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
]

const resendOTPValidation = [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email")]

const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
]

// Routes
router.post("/signup", signupValidation, authController.signup)
router.post("/verify-email", verifyEmailValidation, authController.verifyEmail)
router.post("/resend-otp", resendOTPValidation, authController.resendOTP)
router.post("/login", loginValidation, authController.login)
router.get("/me", auth, authController.getMe)
router.put("/profile", auth, authController.updateProfile)
router.put("/change-password", auth, changePasswordValidation, authController.changePassword)

module.exports = router
