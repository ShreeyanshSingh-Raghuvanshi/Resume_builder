// "use client"

// import { useState } from "react"
// import { Link, useNavigate, useLocation } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
// import { useAuth } from "../hooks/useAuth"
// import { useTheme } from "../hooks/useTheme"
// import { useKeyPress } from "../hooks/useKeyPress"
// import toast from "react-hot-toast"

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState({})

//   const { login } = useAuth()
//   const { theme } = useTheme()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const from = location.state?.from?.pathname || "/dashboard"

//   // Handle Enter key submission
//   useKeyPress("Enter", () => {
//     if (formData.email && formData.password) {
//       handleSubmit()
//     }
//   })

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
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
//       const result = await login(formData.email, formData.password)

//       if (result.success) {
//         toast.success("Welcome back!", {
//           icon: "🎉",
//         })
//         navigate(from, { replace: true })
//       } else {
//         if (result.needsVerification) {
//           navigate("/verify-email", {
//             state: { email: formData.email },
//           })
//         } else {
//           toast.error(result.error || "Login failed")
//         }
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
//         {[...Array(12)].map((_, i) => (
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
//                 Welcome Back
//               </h1>
//             </motion.div>
//             <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
//               Sign in to your CineCV account
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
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
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
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
//                   placeholder="Enter your password"
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

//             {/* Submit Button */}
//             <motion.button
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
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
//                   <span>Sign In</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </motion.button>

//             {/* Signup Link */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="text-center"
//             >
//               <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signup"
//                   className="text-cinematic-gold hover:text-cinematic-neon transition-colors duration-200 font-medium"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </motion.div>
//           </form>
//         </div>

//         {/* Additional Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//           className="text-center mt-6"
//         >
//           <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
//             Secure login with industry-standard encryption
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

// export default Login






















// "use client"

// import { useState } from "react"
// import { Link, useNavigate, useLocation } from "react-router-dom"
// import { motion } from "framer-motion"
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
// import { useAuth } from "../hooks/useAuth"
// import { useTheme } from "../hooks/useTheme"
// import { useKeyPress } from "../hooks/useKeyPress"
// import toast from "react-hot-toast"

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState({})

//   const { login } = useAuth()
//   const { theme } = useTheme()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const from = location.state?.from?.pathname || "/dashboard"

//   // Handle Enter key submission
//   useKeyPress("Enter", () => {
//     if (formData.email && formData.password) {
//       handleSubmit()
//     }
//   })

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
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
//       const result = await login(formData.email, formData.password)

//       if (result.success) {
//         toast.success("Welcome back!", {
//           icon: "🎉",
//         })
//         navigate(from, { replace: true })
//       } else {
//         if (result.needsVerification) {
//           navigate("/verify-email", {
//             state: { email: formData.email },
//           })
//         } else {
//           toast.error(result.error || "Login failed")
//         }
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
//       className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${theme === "dark" ? "bg-primary-dark" : "bg-primary-light"}`}
//     >
//       {/* Background Animation */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(12)].map((_, i) => (
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
//           className={`glass backdrop-blur-sm border rounded-3xl p-8 shadow-2xl ${theme === "dark" ? "glass-dark" : "glass-light"}`}
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
//                 Welcome Back
//               </h1>
//             </motion.div>
//             <p className={`text-lg ${theme === "dark" ? "text-secondary-dark" : "text-secondary-light"}`}>
//               Sign in to your CineCV account
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
//               <label className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"}`}>
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className={`input-icon ${theme === "dark" ? "input-icon-dark" : "input-icon-light"}`} />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   className={`form-input ${theme === "dark" ? "form-input-dark" : "form-input-light"} ${
//                     errors.email ? "border-red-500 focus:border-red-500" : ""
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
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
//               <label className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"}`}>
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className={`input-icon ${theme === "dark" ? "input-icon-dark" : "input-icon-light"}`} />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className={`form-input pr-12 ${theme === "dark" ? "form-input-dark" : "form-input-light"} ${
//                     errors.password ? "border-red-500 focus:border-red-500" : ""
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
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

//             {/* Submit Button */}
//             <motion.button
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
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
//                   <span>Sign In</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </motion.button>

//             {/* Signup Link */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.6 }}
//               className="text-center"
//             >
//               <p className={`${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}>
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signup"
//                   className="text-cinematic-gold hover:text-cinematic-neon transition-colors duration-200 font-medium"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </motion.div>
//           </form>
//         </div>

//         {/* Additional Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//           className="text-center mt-6"
//         >
//           <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
//             Secure login with industry-standard encryption
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

// export default Login

















"use client";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { useKeyPress } from "../hooks/useKeyPress";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  // Handle Enter key submission
  useKeyPress("Enter", () => {
    if (formData.email && formData.password) {
      handleSubmit();
    }
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success("Welcome back!", {
          icon: "🎉",
        });
        navigate(from, { replace: true });
      } else {
        if (result.needsVerification) {
          navigate("/verify-email", {
            state: { email: formData.email },
          });
        } else {
          toast.error(result.error || "Login failed");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 pb-12 px-6 flex items-center justify-center relative overflow-hidden ${theme === "dark" ? "bg-primary-dark" : "bg-primary-light"
        }`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
          className={`glass backdrop-blur-sm border rounded-3xl p-8 shadow-2xl ${theme === "dark" ? "glass-dark" : "glass-light"
            }`}
        >
          {/* Header */}
          <div className="text-center mb-8 select-text">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-4 gap-2"
            >
              <Sparkles className="w-8 h-8 text-cinematic-gold" />
              <h1 className="text-3xl font-cinematic font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
                Welcome Back
              </h1>
            </motion.div>
            <p
              className={`text-lg ${theme === "dark" ? "text-secondary-dark" : "text-secondary-light"
                }`}
            >
              Sign in to your CineCV account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <label
                htmlFor="email"
                className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"
                  }`}
              >
                Email Address
              </label>
              <div className="relative w-full">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`form-input w-full pl-12 placeholder:${theme === "dark" ? "text-gray-400" : "text-gray-600"
                    } ${theme === "dark" ? "form-input-dark" : "form-input-light"
                    } ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <motion.p
                  id="email-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 select-text"
                  role="alert"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label
                htmlFor="password"
                className={`form-label ${theme === "dark" ? "form-label-dark" : "form-label-light"
                  }`}
              >
                Password
              </label>
              <div className="relative w-full">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`form-input w-full pl-12 pr-12 placeholder:${theme === "dark" ? "text-gray-400" : "text-gray-600"
                    } ${theme === "dark" ? "form-input-dark" : "form-input-light"
                    } ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none ${theme === "dark"
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  id="password-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 select-text"
                  role="alert"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed select-none"
            >
              {isLoading ? (
                <div className="loading-spinner w-6 h-6 border-2 border-black/20 border-t-black"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Signup Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center select-text"
            >
              <p className={`${theme === "dark" ? "text-muted-dark" : "text-muted-light"}`}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-cinematic-gold hover:text-cinematic-neon transition-colors duration-200 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </form>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6 select-text"
        >
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
            Secure login with industry-standard encryption
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;