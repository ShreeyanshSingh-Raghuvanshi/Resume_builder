// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"
// import { Plus, FileText, Edit, Trash2, Download, Eye, Star, Calendar } from "lucide-react"
// import { useAuth } from "../hooks/useAuth"
// import { useTheme } from "../hooks/useTheme"
// import { useResume } from "../context/ResumeContext"
// import { formatDate } from "../utils/helpers" // Import formatDate function

// const Dashboard = () => {
//   const { user } = useAuth()
//   const { theme } = useTheme()
//   const { resumes, fetchResumes, deleteResume, exportToPDF, isLoading } = useResume()
//   const [stats, setStats] = useState({
//     totalResumes: 0,
//     totalViews: 0,
//     totalDownloads: 0,
//     avgRating: 0,
//   })

//   useEffect(() => {
//     fetchResumes()
//   }, [])

//   useEffect(() => {
//     if (resumes.length > 0) {
//       const totalViews = resumes.reduce((sum, resume) => sum + (resume.views || 0), 0)
//       const totalDownloads = resumes.reduce((sum, resume) => sum + (resume.downloads || 0), 0)
//       const avgRating =
//         resumes.length > 0 ? resumes.reduce((sum, resume) => sum + (resume.rating || 0), 0) / resumes.length : 0

//       setStats({
//         totalResumes: resumes.length,
//         totalViews,
//         totalDownloads,
//         avgRating: avgRating.toFixed(1),
//       })
//     }
//   }, [resumes])

//   const handleDeleteResume = async (resumeId, resumeTitle) => {
//     if (window.confirm(`Are you sure you want to delete "${resumeTitle}"?`)) {
//       try {
//         await deleteResume(resumeId)
//       } catch (error) {
//         // Error is handled in the context
//       }
//     }
//   }

//   const handleExportResume = async (resumeId) => {
//     try {
//       await exportToPDF(resumeId)
//     } catch (error) {
//       // Error is handled in the context
//     }
//   }

//   if (isLoading) {
//     return (
//       <div
//         className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
//           theme === "dark"
//             ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//             : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//         }`}
//       >
//         <div className="text-center">
//           <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
//           <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Loading your dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className={`min-h-screen pt-20 pb-12 px-4 ${
//         theme === "dark"
//           ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//           : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-cinematic font-bold mb-4 bg-gradient-to-r from-cinematic-gold via-white to-cinematic-neon bg-clip-text text-transparent">
//                 Welcome back, {user?.name}!
//               </h1>
//               <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//                 Manage your resumes and track your success
//               </p>
//             </div>
//             <Link
//               to="/templates"
//               className="mt-6 md:mt-0 bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cinematic-gold/30 transition-all duration-200 flex items-center gap-2 w-fit"
//             >
//               <Plus className="w-5 h-5" />
//               Create New Resume
//             </Link>
//           </div>
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
//         >
//           <StatCard
//             icon={<FileText className="w-8 h-8" />}
//             title="Total Resumes"
//             value={stats.totalResumes}
//             theme={theme}
//           />
//           <StatCard icon={<Eye className="w-8 h-8" />} title="Total Views" value={stats.totalViews} theme={theme} />
//           <StatCard
//             icon={<Download className="w-8 h-8" />}
//             title="Downloads"
//             value={stats.totalDownloads}
//             theme={theme}
//           />
//           <StatCard icon={<Star className="w-8 h-8" />} title="Avg Rating" value={stats.avgRating} theme={theme} />
//         </motion.div>

//         {/* Resumes Section */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
//           <div className="flex items-center justify-between mb-8">
//             <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//               Your Resumes ({resumes.length})
//             </h2>
//           </div>

//           {resumes.length === 0 ? (
//             <EmptyState theme={theme} />
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {resumes.map((resume, index) => (
//                 <ResumeCard
//                   key={resume._id}
//                   resume={resume}
//                   index={index}
//                   theme={theme}
//                   onDelete={handleDeleteResume}
//                   onExport={handleExportResume}
//                 />
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// // Stat Card Component
// const StatCard = ({ icon, title, value, theme }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className={`backdrop-blur-sm border rounded-2xl p-6 ${
//       theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200 shadow-sm"
//     }`}
//   >
//     <div className="flex items-center justify-between">
//       <div>
//         <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{title}</p>
//         <p className={`text-3xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{value}</p>
//       </div>
//       <div className="text-cinematic-gold">{icon}</div>
//     </div>
//   </motion.div>
// )

// // Resume Card Component
// const ResumeCard = ({ resume, index, theme, onDelete, onExport }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay: index * 0.1 }}
//     className={`backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
//       theme === "dark"
//         ? "bg-gray-800/50 border-gray-700 hover:border-cinematic-neon/50"
//         : "bg-white/80 border-gray-200 hover:border-cinematic-gold/50 shadow-sm hover:shadow-lg"
//     }`}
//   >
//     {/* Preview */}
//     <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <FileText className="w-16 h-16 text-gray-400" />
//       </div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//         <div className="flex gap-3">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
//           >
//             <Eye className="w-5 h-5 text-white" />
//           </motion.button>
//           <Link to={`/editor/${resume._id}`}>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="bg-cinematic-gold/90 backdrop-blur-sm p-3 rounded-full hover:bg-cinematic-gold transition-colors duration-200"
//             >
//               <Edit className="w-5 h-5 text-black" />
//             </motion.div>
//           </Link>
//         </div>
//       </div>

//       {/* Status Badge */}
//       <div className="absolute top-3 right-3">
//         <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">Active</div>
//       </div>
//     </div>

//     {/* Resume Info */}
//     <div className="p-6">
//       <h3 className={`font-bold text-lg mb-2 truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//         {resume.title}
//       </h3>

//       <div className={`flex items-center gap-4 text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//         <div className="flex items-center gap-1">
//           <Calendar className="w-4 h-4" />
//           <span>{formatDate(resume.updatedAt)}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <Eye className="w-4 h-4" />
//           <span>{resume.views || 0}</span>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex items-center justify-between">
//         <div className="flex gap-2">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => onExport(resume._id)}
//             className={`p-2 rounded-full transition-colors duration-200 ${
//               theme === "dark"
//                 ? "text-gray-400 hover:text-cinematic-gold hover:bg-gray-700"
//                 : "text-gray-500 hover:text-cinematic-gold hover:bg-gray-100"
//             }`}
//             title="Download PDF"
//           >
//             <Download className="w-4 h-4" />
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => onDelete(resume._id, resume.title)}
//             className={`p-2 rounded-full transition-colors duration-200 ${
//               theme === "dark"
//                 ? "text-gray-400 hover:text-red-400 hover:bg-gray-700"
//                 : "text-gray-500 hover:text-red-500 hover:bg-gray-100"
//             }`}
//             title="Delete Resume"
//           >
//             <Trash2 className="w-4 h-4" />
//           </motion.button>
//         </div>

//         <Link
//           to={`/editor/${resume._id}`}
//           className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-4 py-2 rounded-full font-medium text-sm hover:shadow-lg transition-all duration-200"
//         >
//           Edit
//         </Link>
//       </div>
//     </div>
//   </motion.div>
// )

// // Empty State Component
// const EmptyState = ({ theme }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     className={`text-center py-16 backdrop-blur-sm border rounded-2xl ${
//       theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
//     }`}
//   >
//     <FileText className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
//     <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>No resumes yet</h3>
//     <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//       Create your first resume and start building your professional story
//     </p>
//     <Link
//       to="/templates"
//       className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cinematic-gold/30 transition-all duration-200 inline-flex items-center gap-2"
//     >
//       <Plus className="w-5 h-5" />
//       Create Your First Resume
//     </Link>
//   </motion.div>
// )

// export default Dashboard

















"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Plus, FileText, Edit, Trash2, Download, Eye, Star, Calendar } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"
import { useResume } from "../context/ResumeContext"
import { formatDate } from "../utils/helpers"

const Dashboard = () => {
  const { user } = useAuth()
  const { theme } = useTheme()
  const { resumes, fetchResumes, deleteResume, exportToPDF, isLoading } = useResume()
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalViews: 0,
    totalDownloads: 0,
    avgRating: 0,
  })

  useEffect(() => {
    fetchResumes()
  }, [])

  useEffect(() => {
    if (resumes.length > 0) {
      const totalViews = resumes.reduce((sum, resume) => sum + (resume.views || 0), 0)
      const totalDownloads = resumes.reduce((sum, resume) => sum + (resume.downloads || 0), 0)
      const avgRating =
        resumes.length > 0 ? resumes.reduce((sum, resume) => sum + (resume.rating || 4.5), 0) / resumes.length : 0

      setStats({
        totalResumes: resumes.length,
        totalViews,
        totalDownloads,
        avgRating: avgRating.toFixed(1),
      })
    }
  }, [resumes])

  const handleDeleteResume = async (resumeId, resumeTitle) => {
    if (window.confirm(`Are you sure you want to delete "${resumeTitle}"?`)) {
      try {
        await deleteResume(resumeId)
      } catch (error) {
        // Error is handled in the context
      }
    }
  }

  const handleExportResume = async (resumeId) => {
    try {
      await exportToPDF(resumeId)
    } catch (error) {
      // Error is handled in the context
    }
  }

  if (isLoading) {
    return (
      <div
        className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
            : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}
      >
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen pt-20 pb-12 px-4 ${
        theme === "dark"
          ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-cinematic font-bold mb-4 bg-gradient-to-r from-cinematic-gold via-white to-cinematic-neon bg-clip-text text-transparent">
                Welcome back, {user?.name}!
              </h1>
              <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Manage your resumes and track your success
              </p>
            </div>
            <Link
              to="/templates"
              className="mt-6 md:mt-0 bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cinematic-gold/30 transition-all duration-200 flex items-center gap-2 w-fit"
            >
              <Plus className="w-5 h-5" />
              Create New Resume
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatCard
            icon={<FileText className="w-8 h-8" />}
            title="Total Resumes"
            value={stats.totalResumes}
            theme={theme}
          />
          <StatCard icon={<Eye className="w-8 h-8" />} title="Total Views" value={stats.totalViews} theme={theme} />
          <StatCard
            icon={<Download className="w-8 h-8" />}
            title="Downloads"
            value={stats.totalDownloads}
            theme={theme}
          />
          <StatCard icon={<Star className="w-8 h-8" />} title="Avg Rating" value={stats.avgRating} theme={theme} />
        </motion.div>

        {/* Resumes Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Your Resumes ({resumes.length})
            </h2>
          </div>

          {resumes.length === 0 ? (
            <EmptyState theme={theme} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume, index) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  index={index}
                  theme={theme}
                  onDelete={handleDeleteResume}
                  onExport={handleExportResume}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Stat Card Component
const StatCard = ({ icon, title, value, theme }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`backdrop-blur-sm border rounded-2xl p-6 ${
      theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200 shadow-sm"
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{title}</p>
        <p className={`text-3xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{value}</p>
      </div>
      <div className="text-cinematic-gold">{icon}</div>
    </div>
  </motion.div>
)

// Resume Card Component
const ResumeCard = ({ resume, index, theme, onDelete, onExport }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
      theme === "dark"
        ? "bg-gray-800/50 border-gray-700 hover:border-cinematic-neon/50"
        : "bg-white/80 border-gray-200 hover:border-cinematic-gold/50 shadow-sm hover:shadow-lg"
    }`}
  >
    {/* Preview */}
    <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <FileText className="w-16 h-16 text-gray-400" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            <Eye className="w-5 h-5 text-white" />
          </motion.button>
          <Link to={`/editor/${resume._id}`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-cinematic-gold/90 backdrop-blur-sm p-3 rounded-full hover:bg-cinematic-gold transition-colors duration-200"
            >
              <Edit className="w-5 h-5 text-black" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-3 right-3">
        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">Active</div>
      </div>
    </div>

    {/* Resume Info */}
    <div className="p-6">
      <h3 className={`font-bold text-lg mb-2 truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        {resume.title}
      </h3>

      <div className={`flex items-center gap-4 text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(resume.updatedAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{resume.views || 0}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onExport(resume._id)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === "dark"
                ? "text-gray-400 hover:text-cinematic-gold hover:bg-gray-700"
                : "text-gray-500 hover:text-cinematic-gold hover:bg-gray-100"
            }`}
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(resume._id, resume.title)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === "dark"
                ? "text-gray-400 hover:text-red-400 hover:bg-gray-700"
                : "text-gray-500 hover:text-red-500 hover:bg-gray-100"
            }`}
            title="Delete Resume"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>

        <Link
          to={`/editor/${resume._id}`}
          className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-4 py-2 rounded-full font-medium text-sm hover:shadow-lg transition-all duration-200"
        >
          Edit
        </Link>
      </div>
    </div>
  </motion.div>
)

// Empty State Component
const EmptyState = ({ theme }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`text-center py-16 backdrop-blur-sm border rounded-2xl ${
      theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
    }`}
  >
    <FileText className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
    <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>No resumes yet</h3>
    <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
      Create your first resume and start building your professional story
    </p>
    <Link
      to="/templates"
      className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cinematic-gold/30 transition-all duration-200 inline-flex items-center gap-2"
    >
      <Plus className="w-5 h-5" />
      Create Your First Resume
    </Link>
  </motion.div>
)

export default Dashboard
