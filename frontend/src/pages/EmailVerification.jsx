"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, ArrowRight, RefreshCw, CheckCircle } from "lucide-react"
import { useTheme } from "../hooks/useTheme"
import { useKeyPress } from "../hooks/useKeyPress"
import { api } from "../utils/api"
import toast from "react-hot-toast"

const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isVerified, setIsVerified] = useState(false)

  const { theme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  // Handle Enter key submission
  useKeyPress("Enter", () => {
    if (otp.every((digit) => digit !== "")) {
      handleVerifyOTP()
    }
  })

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/signup")
    }
  }, [email, navigate])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleVerifyOTP = async () => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post("/auth/verify-email", {
        email,
        otp: otpString,
      })

      if (response.data.success) {
        setIsVerified(true)
        toast.success("Email verified successfully!", {
          icon: "🎉",
        })

        setTimeout(() => {
          navigate("/dashboard")
        }, 2000)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)

    try {
      await api.post("/auth/resend-otp", { email })
      toast.success("OTP sent successfully!")
      setTimeLeft(300) // Reset timer
      setOtp(["", "", "", "", "", ""]) // Clear OTP
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP")
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isVerified) {
    return (
      <div
        className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
            : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}
      >
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-green-500 mb-4">Email Verified!</h1>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
        theme === "dark"
          ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div
          className={`backdrop-blur-sm border rounded-3xl p-8 shadow-2xl ${
            theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-4"
            >
              <Mail className="w-12 h-12 text-cinematic-gold" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
              Verify Your Email
            </h1>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>We've sent a 6-digit code to</p>
            <p className="font-medium text-cinematic-gold">{email}</p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <div className="flex justify-center space-x-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-white focus:border-cinematic-neon"
                      : "bg-white border-gray-300 text-gray-900 focus:border-cinematic-gold"
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Code expires in: <span className="font-mono text-cinematic-gold">{formatTime(timeLeft)}</span>
              </p>
            </div>
          </div>

          {/* Verify Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.some((digit) => digit === "")}
            className="w-full bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? (
              <div className="loading-spinner w-6 h-6 border-2 border-black/20 border-t-black"></div>
            ) : (
              <>
                <span>Verify Email</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Resend Button */}
          <div className="text-center">
            <p className={`text-sm mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={isResending || timeLeft > 0}
              className={`text-cinematic-gold hover:text-cinematic-neon transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto ${
                isResending ? "animate-pulse" : ""
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`} />
              <span>Resend Code</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EmailVerification
