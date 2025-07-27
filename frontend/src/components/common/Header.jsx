// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import { Menu, X, User, LogOut, Sun, Moon, Sparkles } from "lucide-react"
// import { useAuth } from "../../hooks/useAuth"
// import { useTheme } from "../../hooks/useTheme"
// import { useKeyPress } from "../../hooks/useKeyPress"
// import toast from "react-hot-toast"

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [showAuthModal, setShowAuthModal] = useState(false)
//   const [authMode, setAuthMode] = useState("login") // "login" or "signup"
//   const { user, logout } = useAuth()
//   const { theme, toggleTheme } = useTheme()
//   const navigate = useNavigate()

//   // Close menu on Escape key
//   useKeyPress("Escape", () => {
//     setIsMenuOpen(false)
//     setShowAuthModal(false)
//   })

//   const handleLogout = () => {
//     logout()
//     toast.success("Logged out successfully", {
//       icon: "👋",
//     })
//     navigate("/")
//     setIsMenuOpen(false)
//   }

//   const openAuthModal = (mode) => {
//     setAuthMode(mode)
//     setShowAuthModal(true)
//     setIsMenuOpen(false)
//   }

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Templates", path: "/templates" },
//     ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
//   ]

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           theme === "dark"
//             ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
//             : "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
//         }`}
//       >
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-2 group">
//               <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
//                 <Sparkles className="w-6 h-6 text-cinematic-gold" />
//                 <span className="text-2xl font-cinematic font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
//                   CineCV
//                 </span>
//               </motion.div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`font-medium transition-colors duration-200 hover:text-cinematic-neon ${
//                     theme === "dark" ? "text-gray-300" : "text-gray-700"
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Desktop Actions */}
//             <div className="hidden md:flex items-center space-x-4">
//               {/* Theme Toggle */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={toggleTheme}
//                 className={`p-2 rounded-full transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "text-gray-300 hover:text-cinematic-neon hover:bg-gray-800"
//                     : "text-gray-700 hover:text-cinematic-gold hover:bg-gray-100"
//                 }`}
//                 aria-label="Toggle theme"
//               >
//                 {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>

//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <div
//                     className={`flex items-center space-x-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
//                   >
//                     <User className="w-4 h-4" />
//                     <span className="text-sm font-medium">{user.name}</span>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleLogout}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${
//                       theme === "dark"
//                         ? "text-gray-300 hover:text-red-400 hover:bg-gray-800"
//                         : "text-gray-700 hover:text-red-500 hover:bg-gray-100"
//                     }`}
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span className="text-sm">Logout</span>
//                   </motion.button>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-3">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/login")}
//                     className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
//                       theme === "dark"
//                         ? "text-gray-300 hover:text-white hover:bg-gray-800"
//                         : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
//                     }`}
//                   >
//                     Login
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)" }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/signup")}
//                     className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-lg"
//                   >
//                     Sign Up
//                   </motion.button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center space-x-2">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={toggleTheme}
//                 className={`p-2 rounded-full transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "text-gray-300 hover:text-cinematic-neon"
//                     : "text-gray-700 hover:text-cinematic-gold"
//                 }`}
//               >
//                 {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </motion.button>

//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className={`transition-colors duration-200 ${
//                   theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
//                 }`}
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {isMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className={`md:hidden overflow-hidden border-t ${
//                   theme === "dark" ? "border-gray-800" : "border-gray-200"
//                 }`}
//               >
//                 <div className="py-4 space-y-4">
//                   {navItems.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className={`block px-4 py-2 font-medium transition-colors duration-200 hover:text-cinematic-neon ${
//                         theme === "dark" ? "text-gray-300" : "text-gray-700"
//                       }`}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}

//                   {user ? (
//                     <div className="px-4 space-y-3 pt-4 border-t border-gray-700">
//                       <div
//                         className={`flex items-center space-x-2 ${
//                           theme === "dark" ? "text-gray-300" : "text-gray-700"
//                         }`}
//                       >
//                         <User className="w-4 h-4" />
//                         <span className="text-sm font-medium">{user.name}</span>
//                       </div>
//                       <button
//                         onClick={handleLogout}
//                         className={`flex items-center space-x-2 w-full text-left py-2 transition-colors duration-200 ${
//                           theme === "dark" ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-500"
//                         }`}
//                       >
//                         <LogOut className="w-4 h-4" />
//                         <span className="text-sm">Logout</span>
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="px-4 space-y-3 pt-4 border-t border-gray-700">
//                       <button
//                         onClick={() => {
//                           navigate("/login")
//                           setIsMenuOpen(false)
//                         }}
//                         className={`block w-full text-left py-2 font-medium transition-colors duration-200 ${
//                           theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
//                         }`}
//                       >
//                         Login
//                       </button>
//                       <button
//                         onClick={() => {
//                           navigate("/signup")
//                           setIsMenuOpen(false)
//                         }}
//                         className="w-full bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-2 rounded-full font-medium text-center transition-all duration-200 hover:shadow-lg"
//                       >
//                         Sign Up
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </nav>
//       </header>
//     </>
//   )
// }

// export default Header






















"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogOut, Sun, Moon, Sparkles } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../hooks/useTheme"
import { useKeyPress } from "../../hooks/useKeyPress"
import toast from "react-hot-toast"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  // Close menu on Escape key
  useKeyPress("Escape", () => {
    setIsMenuOpen(false)
  })

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully", {
      icon: "👋",
    })
    navigate("/")
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          theme === "dark"
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-cinematic-gold" />
                <span className="text-2xl font-cinematic font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent">
                  CineCV
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 hover:text-cinematic-neon ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-cinematic-neon hover:bg-gray-800"
                    : "text-gray-700 hover:text-cinematic-gold hover:bg-gray-100"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center space-x-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-red-400 hover:bg-gray-800"
                        : "text-gray-700 hover:text-red-500 hover:bg-gray-100"
                    }`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                    className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-2 rounded-full font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-cinematic-neon"
                    : "text-gray-700 hover:text-cinematic-gold"
                }`}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`transition-colors duration-200 ${
                  theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden overflow-hidden border-t ${
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <div className="py-4 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 font-medium transition-colors duration-200 hover:text-cinematic-neon ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {user ? (
                    <div className="px-4 space-y-3 pt-4 border-t border-gray-700">
                      <div
                        className={`flex items-center space-x-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-2 w-full text-left py-2 transition-colors duration-200 ${
                          theme === "dark" ? "text-gray-300 hover:text-red-400" : "text-gray-700 hover:text-red-500"
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="px-4 space-y-3 pt-4 border-t border-gray-700">
                      <button
                        onClick={() => {
                          navigate("/login")
                          setIsMenuOpen(false)
                        }}
                        className={`block w-full text-left py-2 font-medium transition-colors duration-200 ${
                          theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/signup")
                          setIsMenuOpen(false)
                        }}
                        className="w-full bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-2 rounded-full font-medium text-center transition-all duration-200 hover:shadow-lg"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  )
}

export default Header
