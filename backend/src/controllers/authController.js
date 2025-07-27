// const User = require("../models/User")
// const jwt = require("jsonwebtoken")
// const nodemailer = require("nodemailer")
// const crypto = require("crypto")
// const { validationResult } = require("express-validator")

// // Email transporter setup
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST || "smtp.gmail.com",
//   port: process.env.EMAIL_PORT || 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// })

// // Generate JWT token
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
//     expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   })
// }

// // Generate OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString()
// }

// // Send OTP email
// const sendOTPEmail = async (email, otp, name) => {
//   const mailOptions = {
//     from: `"CineCV" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Verify Your CineCV Account",
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; border-radius: 20px; overflow: hidden;">
//         <div style="padding: 40px; text-align: center;">
//           <h1 style="color: #ffd700; font-size: 32px; margin-bottom: 20px;">✨ Welcome to CineCV!</h1>
//           <p style="font-size: 18px; margin-bottom: 30px;">Hi ${name},</p>
//           <p style="font-size: 16px; margin-bottom: 30px; line-height: 1.6;">
//             Thank you for joining CineCV! To complete your registration and start creating amazing resumes, please verify your email address.
//           </p>
          
//           <div style="background: rgba(255, 215, 0, 0.1); border: 2px solid #ffd700; border-radius: 15px; padding: 30px; margin: 30px 0;">
//             <p style="font-size: 16px; margin-bottom: 15px;">Your verification code is:</p>
//             <div style="font-size: 36px; font-weight: bold; color: #ffd700; letter-spacing: 8px; font-family: monospace;">
//               ${otp}
//             </div>
//           </div>
          
//           <p style="font-size: 14px; color: #cccccc; margin-top: 30px;">
//             This code will expire in 5 minutes. If you didn't create an account with CineCV, please ignore this email.
//           </p>
          
//           <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #333;">
//             <p style="font-size: 14px; color: #888;">
//               Best regards,<br>
//               The CineCV Team
//             </p>
//           </div>
//         </div>
//       </div>
//     `,
//   }

//   await transporter.sendMail(mailOptions)
// }

// // Register user
// exports.signup = async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array(),
//       })
//     }

//     const { name, email, password } = req.body

//     // Check if user already exists
//     const existingUser = await User.findOne({ email })
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email",
//       })
//     }

//     // Generate OTP
//     const otp = generateOTP()
//     const otpExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       password,
//       emailVerificationOTP: otp,
//       emailVerificationExpires: otpExpires,
//       emailVerified: false,
//     })

//     await user.save()

//     // Send OTP email
//     try {
//       await sendOTPEmail(email, otp, name)
//     } catch (emailError) {
//       console.error("Email sending failed:", emailError)
//       // Don't fail the registration if email fails
//     }

//     res.status(201).json({
//       success: true,
//       message: "User created successfully. Please check your email for verification code.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         emailVerified: user.emailVerified,
//       },
//     })
//   } catch (error) {
//     console.error("Signup error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error during signup",
//     })
//   }
// }

// // Verify email with OTP
// exports.verifyEmail = async (req, res) => {
//   try {
//     const { email, otp } = req.body

//     const user = await User.findOne({
//       email,
//       emailVerificationOTP: otp,
//       emailVerificationExpires: { $gt: Date.now() },
//     })

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired OTP",
//       })
//     }

//     // Update user
//     user.emailVerified = true
//     user.emailVerificationOTP = undefined
//     user.emailVerificationExpires = undefined
//     await user.save()

//     // Generate token
//     const token = generateToken(user._id)

//     res.json({
//       success: true,
//       message: "Email verified successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         emailVerified: user.emailVerified,
//         subscription: user.subscription,
//       },
//     })
//   } catch (error) {
//     console.error("Email verification error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error during email verification",
//     })
//   }
// }

// // Resend OTP
// exports.resendOTP = async (req, res) => {
//   try {
//     const { email } = req.body

//     const user = await User.findOne({ email, emailVerified: false })
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found or already verified",
//       })
//     }

//     // Generate new OTP
//     const otp = generateOTP()
//     const otpExpires = new Date(Date.now() + 5 * 60 * 1000)

//     user.emailVerificationOTP = otp
//     user.emailVerificationExpires = otpExpires
//     await user.save()

//     // Send OTP email
//     try {
//       await sendOTPEmail(email, otp, user.name)
//     } catch (emailError) {
//       console.error("Email sending failed:", emailError)
//       return res.status(500).json({
//         success: false,
//         message: "Failed to send email",
//       })
//     }

//     res.json({
//       success: true,
//       message: "OTP sent successfully",
//     })
//   } catch (error) {
//     console.error("Resend OTP error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error during OTP resend",
//     })
//   }
// }

// // Login user
// exports.login = async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array(),
//       })
//     }

//     const { email, password } = req.body

//     // Find user and include password for comparison
//     const user = await User.findOne({ email }).select("+password")
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       })
//     }

//     // Check password
//     const isPasswordValid = await user.comparePassword(password)
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       })
//     }

//     // Check if email is verified
//     if (!user.emailVerified) {
//       return res.status(401).json({
//         success: false,
//         message: "Please verify your email before logging in",
//         needsVerification: true,
//       })
//     }

//     // Update last login
//     user.lastLogin = new Date()
//     await user.save()

//     // Generate token
//     const token = generateToken(user._id)

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         emailVerified: user.emailVerified,
//         subscription: user.subscription,
//       },
//     })
//   } catch (error) {
//     console.error("Login error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//     })
//   }
// }

// // Get current user
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate("resumes")

//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         emailVerified: user.emailVerified,
//         subscription: user.subscription,
//         avatar: user.avatar,
//         resumeCount: user.resumes.length,
//         createdAt: user.createdAt,
//       },
//     })
//   } catch (error) {
//     console.error("Get user error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error fetching user data",
//     })
//   }
// }

// // Update user profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const { name, avatar } = req.body

//     const user = await User.findById(req.user.id)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       })
//     }

//     if (name) user.name = name
//     if (avatar) user.avatar = avatar

//     await user.save()

//     res.json({
//       success: true,
//       message: "Profile updated successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         emailVerified: user.emailVerified,
//         subscription: user.subscription,
//         avatar: user.avatar,
//       },
//     })
//   } catch (error) {
//     console.error("Update profile error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error updating profile",
//     })
//   }
// }

// // Change password
// exports.changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body

//     const user = await User.findById(req.user.id).select("+password")
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       })
//     }

//     // Verify current password
//     const isCurrentPasswordValid = await user.comparePassword(currentPassword)
//     if (!isCurrentPasswordValid) {
//       return res.status(400).json({
//         success: false,
//         message: "Current password is incorrect",
//       })
//     }

//     // Update password
//     user.password = newPassword
//     await user.save()

//     res.json({
//       success: true,
//       message: "Password changed successfully",
//     })
//   } catch (error) {
//     console.error("Change password error:", error)
//     res.status(500).json({
//       success: false,
//       message: "Server error changing password",
//     })
//   }
// }





















const User = require("../models/User")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const { validationResult } = require("express-validator")

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  })
}

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP email
const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"CineCV" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your CineCV Account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; border-radius: 20px; overflow: hidden;">
        <div style="padding: 40px; text-align: center;">
          <h1 style="color: #ffd700; font-size: 32px; margin-bottom: 20px;">✨ Welcome to CineCV!</h1>
          <p style="font-size: 18px; margin-bottom: 30px;">Hi ${name},</p>
          <p style="font-size: 16px; margin-bottom: 30px; line-height: 1.6;">
            Thank you for joining CineCV! To complete your registration and start creating amazing resumes, please verify your email address.
          </p>
          
          <div style="background: rgba(255, 215, 0, 0.1); border: 2px solid #ffd700; border-radius: 15px; padding: 30px; margin: 30px 0;">
            <p style="font-size: 16px; margin-bottom: 15px;">Your verification code is:</p>
            <div style="font-size: 36px; font-weight: bold; color: #ffd700; letter-spacing: 8px; font-family: monospace;">
              ${otp}
            </div>
          </div>
          
          <p style="font-size: 14px; color: #cccccc; margin-top: 30px;">
            This code will expire in 5 minutes. If you didn't create an account with CineCV, please ignore this email.
          </p>
          
          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #333;">
            <p style="font-size: 14px; color: #888;">
              Best regards,<br>
              The CineCV Team
            </p>
          </div>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

// Register user
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    // Generate OTP
    const otp = generateOTP()
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    // Create new user
    const user = new User({
      name,
      email,
      password,
      emailVerificationOTP: otp,
      emailVerificationExpires: otpExpires,
      emailVerified: false,
    })

    await user.save()

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, name)
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the registration if email fails
    }

    res.status(201).json({
      success: true,
      message: "User created successfully. Please check your email for verification code.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during signup",
    })
  }
}

// Verify email with OTP
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body

    const user = await User.findOne({
      email,
      emailVerificationOTP: otp,
      emailVerificationExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      })
    }

    // Update user
    user.emailVerified = true
    user.emailVerificationOTP = undefined
    user.emailVerificationExpires = undefined
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    console.error("Email verification error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during email verification",
    })
  }
}

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email, emailVerified: false })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or already verified",
      })
    }

    // Generate new OTP
    const otp = generateOTP()
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000)

    user.emailVerificationOTP = otp
    user.emailVerificationExpires = otpExpires
    await user.save()

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, user.name)
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      })
    }

    res.json({
      success: true,
      message: "OTP sent successfully",
    })
  } catch (error) {
    console.error("Resend OTP error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during OTP resend",
    })
  }
}

// Login user
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in",
        needsVerification: true,
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during login",
    })
  }
}

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("resumes")

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        subscription: user.subscription,
        avatar: user.avatar,
        resumeCount: user.resumes.length,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)
    res.status(500).json({
      success: false,
      message: "Server error fetching user data",
    })
  }
}

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (name) user.name = name
    if (avatar) user.avatar = avatar

    await user.save()

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        subscription: user.subscription,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({
      success: false,
      message: "Server error updating profile",
    })
  }
}

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user.id).select("+password")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({
      success: false,
      message: "Server error changing password",
    })
  }
}
