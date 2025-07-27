// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Eye, EyeOff, Mail, User, Lock, ArrowRight, Sparkles } from "lucide-react"
// import { useAuth } from "../hooks/useAuth"
// import { useTheme } from "../hooks/useTheme"
// import { useKeyPress } from "../hooks/useKeyPress"
// import toast from "react-hot-toast"

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState({})

//   const { signup } = useAuth()
//   const { theme } = useTheme()
//   const navigate = useNavigate()

//   // Handle Enter key submission
//   useKeyPress("Enter", () => {
//     if (formData.name && formData.email && formData.password && formData.confirmPassword) {
//       handleSubmit()
//     }
//   })

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required"
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = "Name must be at least 2 characters"
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password"
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault()

//     if (!validateForm()) {
//       toast.error("Please fix the errors below")
//       return
//     }

//     setIsLoading(true)

//     try {
//       const result = await signup(formData.name, formData.email, formData.password)

//       if (result.success) {
//         toast.success("Account created! Please verify your email.", {
//           icon: "🎉",
//           duration: 5000,
//         })
//         navigate("/verify-email", {
//           state: { email: formData.email },
//         })
//       } else {
//         toast.error(result.error || "Signup failed")
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }))
//     }
//   }

//   return (
//     <div
//       className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
//         theme === "dark"
//           ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//           : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//       }`}
//     >
//       {/* Background Animation */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-cinematic-neon rounded-full opacity-20"
//             animate={{
//               x: [0, 100, 0],
//               y: [0, -100, 0],
//               opacity: [0.2, 0.6, 0.2],
//             }}
//             transition={{
//               duration: 4 + i * 0.5,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: i * 0.3,
//             }}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md relative z-10"
//       >
//         <div
//           className={`backdrop-blur-sm border rounded-3xl p-8 shadow-2xl ${
//             theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
//           }`}
//         >
//           {/* Header */}
//           <div className="text-center mb-8">
//             <motion.div
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="flex items-center justify-center mb-4"
//             >
//               <Sparkles className="w-8 h-8 text-cinematic-gold mr-2" />
//               <h1 className="text-3xl font-cinematic font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
//                 Join CineCV
//               </h1>
//             </motion.div>
//             <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
//               Create your cinematic resume today
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name Field */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Full Name</label>
//               <div className="relative">
//                 <User
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
//                     theme === "dark" ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   className={`form-input pl-10 ${
//                     errors.name
//                       ? "border-red-500 focus:border-red-500"
//                       : theme === "dark"
//                         ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cinematic-neon"
//                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cinematic-gold"
//                   }`}
//                 />
//               </div>
//               {errors.name && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-red-500 text-sm mt-1"
//                 >
//                   {errors.name}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Email Field */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
//                     theme === "dark" ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className={`form-input pl-10 ${
//                     errors.email
//                       ? "border-red-500 focus:border-red-500"
//                       : theme === "dark"
//                         ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cinematic-neon"
//                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cinematic-gold"
//                   }`}
//                 />
//               </div>
//               {errors.email && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-red-500 text-sm mt-1"
//                 >
//                   {errors.email}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Password Field */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Password</label>
//               <div className="relative">
//                 <Lock
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
//                     theme === "dark" ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Create a password"
//                   className={`form-input pl-10 pr-10 ${
//                     errors.password
//                       ? "border-red-500 focus:border-red-500"
//                       : theme === "dark"
//                         ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cinematic-neon"
//                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cinematic-gold"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
//                     theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-red-500 text-sm mt-1"
//                 >
//                   {errors.password}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Confirm Password Field */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock
//                   className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
//                     theme === "dark" ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm your password"
//                   className={`form-input pl-10 pr-10 ${
//                     errors.confirmPassword
//                       ? "border-red-500 focus:border-red-500"
//                       : theme === "dark"
//                         ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cinematic-neon"
//                         : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cinematic-gold"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
//                     theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-red-500 text-sm mt-1"
//                 >
//                   {errors.confirmPassword}
//                 </motion.p>
//               )}
//             </motion.div>

//             {/* Submit Button */}
//             <motion.button
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)" }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <div className="loading-spinner w-6 h-6 border-2 border-black/20 border-t-black"></div>
//               ) : (
//                 <>
//                   <span>Create Account</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </motion.button>

//             {/* Login Link */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//               className="text-center"
//             >
//               <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-cinematic-gold hover:text-cinematic-neon transition-colors duration-200 font-medium"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </motion.div>
//           </form>
//         </div>

//         {/* Additional Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.9 }}
//           className="text-center mt-6"
//         >
//           <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
//             By signing up, you agree to our Terms of Service and Privacy Policy
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

// export default Signup















































"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, User, Lock, ArrowRight, Sparkles } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"
import { useKeyPress } from "../hooks/useKeyPress"
import toast from "react-hot-toast"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { signup } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  // Handle Enter key submission
  useKeyPress("Enter", () => {
    if (formData.name && formData.email && formData.password && formData.confirmPassword) {
      handleSubmit()
    }
  })

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors below")
      return
    }

    setIsLoading(true)

    try {
      const result = await signup(formData.name, formData.email, formData.password)

      if (result.success) {
        toast.success("Account created! Please verify your email.", {
          icon: "🎉",
          duration: 5000,
        })
        navigate("/verify-email", {
          state: { email: formData.email },
        })
      } else {
        toast.error(result.error || "Signup failed")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <div
      className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${theme === "dark" ? "bg-primary-dark" : "bg-primary-light"}`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cinematic-neon rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className={`glass backdrop-blur-sm border rounded-3xl p-8 shadow-2xl ${theme === "dark" ? "glass-dark" : "glass-light"}`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-4"
            >
              <Sparkles className="w-8 h-8 text-cinematic-gold mr-2" />
              <h1 className="text-3xl font-cinematic font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
                Join CineCV
              </h1>
            </motion.div>
            <p className={`text-lg ${theme === "dark" ? "text-secondary-dark" : "text-secondary-light"}`}>
              Create your cinematic resume today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"}`}>
                Full Name
              </label>
              <div className="relative">
                <User className={`input-icon ${theme === "dark" ? "input-icon-dark" : "input-icon-light"}`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`form-input ${theme === "dark" ? "form-input-dark" : "form-input-light"} ${
                    errors.name ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`input-icon ${theme === "dark" ? "input-icon-dark" : "input-icon-light"}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`form-input ${theme === "dark" ? "form-input-dark" : "form-input-light"} ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`input-icon ${theme === "dark" ? "input-icon-dark" : "input-icon-light"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`form-input pr-12 ${theme === "dark" ? "form-input-dark" : "form-input-light"} ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <label className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`input-icon ${theme === "dark" ? "input-icon-dark" : "input-icon-light"}`} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`form-input pr-12 ${theme === "dark" ? "form-input-dark" : "form-input-light"} ${
                    errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="loading-spinner w-6 h-6 border-2 border-black/20 border-t-black"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className={`${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cinematic-gold hover:text-cinematic-neon transition-colors duration-200 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </form>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-6"
        >
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Signup
