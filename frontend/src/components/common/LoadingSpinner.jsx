// "use client"

// import { motion } from "framer-motion"
// import { Sparkles } from "lucide-react"
// import { useTheme } from "../../hooks/useTheme"

// const LoadingSpinner = ({ size = "large", message = "Loading..." }) => {
//   const { theme } = useTheme()

//   const sizeClasses = {
//     small: "w-6 h-6",
//     medium: "w-8 h-8",
//     large: "w-12 h-12",
//     xl: "w-16 h-16",
//   }

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center ${
//         theme === "dark"
//           ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//           : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//       }`}
//     >
//       <div className="text-center">
//         {/* Animated Logo */}
//         <motion.div
//           animate={{
//             rotate: 360,
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             rotate: {
//               duration: 2,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "linear",
//             },
//             scale: {
//               duration: 1.5,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             },
//           }}
//           className="mb-6"
//         >
//           <Sparkles className={`${sizeClasses[size]} text-cinematic-gold mx-auto`} />
//         </motion.div>

//         {/* Loading Spinner */}
//         <div className="relative mb-6">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{
//               duration: 1,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "linear",
//             }}
//             className={`${sizeClasses[size]} border-4 border-transparent border-t-cinematic-neon border-r-cinematic-gold rounded-full mx-auto`}
//           />
//           <motion.div
//             animate={{ rotate: -360 }}
//             transition={{
//               duration: 1.5,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "linear",
//             }}
//             className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-b-cinematic-gold border-l-cinematic-neon rounded-full mx-auto`}
//           />
//         </div>

//         {/* Loading Text */}
//         <motion.div
//           initial={{ opacity: 0.5 }}
//           animate={{ opacity: 1 }}
//           transition={{
//             duration: 1,
//             repeat: Number.POSITIVE_INFINITY,
//             repeatType: "reverse",
//           }}
//         >
//           <h2
//             className={`text-2xl font-cinematic font-bold mb-2 bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent`}
//           >
//             CineCV
//           </h2>
//           <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{message}</p>
//         </motion.div>

//         {/* Loading Dots */}
//         <div className="flex justify-center space-x-2 mt-6">
//           {[0, 1, 2].map((index) => (
//             <motion.div
//               key={index}
//               animate={{
//                 scale: [1, 1.5, 1],
//                 opacity: [0.5, 1, 0.5],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: index * 0.2,
//               }}
//               className="w-2 h-2 bg-cinematic-neon rounded-full"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LoadingSpinner


















"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"

const LoadingSpinner = ({ size = "large", message = "Loading..." }) => {
  const { theme } = useTheme()

  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xl: "w-16 h-16",
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark"
          ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="mb-6"
        >
          <Sparkles className={`${sizeClasses[size]} text-cinematic-gold mx-auto`} />
        </motion.div>

        {/* Loading Spinner */}
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className={`${sizeClasses[size]} border-4 border-transparent border-t-cinematic-neon border-r-cinematic-gold rounded-full mx-auto`}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-b-cinematic-gold border-l-cinematic-neon rounded-full mx-auto`}
          />
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <h2
            className={`text-2xl font-cinematic font-bold mb-2 bg-gradient-to-r from-cinematic-gold to-cinematic-neon bg-clip-text text-transparent`}
          >
            CineCV
          </h2>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{message}</p>
        </motion.div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-cinematic-neon rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
