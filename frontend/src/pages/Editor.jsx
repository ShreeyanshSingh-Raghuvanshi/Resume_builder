// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import {
//   Save,
//   Download,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   FileText,
//   User,
//   Briefcase,
//   GraduationCap,
//   Code,
//   Award,
//   Globe,
// } from "lucide-react"
// import { useResume } from "../context/ResumeContext"
// import { useTheme } from "../hooks/useTheme"
// import { useKeyPress } from "../hooks/useKeyPress"
// import { TemplateRenderer } from "../components/templates/TemplateGenerator"

// const Editor = () => {
//   const { templateId } = useParams()
//   const navigate = useNavigate()
//   const { theme } = useTheme()
//   const { currentResume, loadResume, saveResume, updateResumeSection, exportToPDF, isLoading, isSaving } = useResume()

//   const [activeSection, setActiveSection] = useState("personalInfo")
//   const [showPreview, setShowPreview] = useState(true)
//   const [resumeData, setResumeData] = useState(null)
//   const [template, setTemplate] = useState(null)

//   // Handle Ctrl+S for save
//   useKeyPress("s", (e) => {
//     if (e.ctrlKey || e.metaKey) {
//       e.preventDefault()
//       handleSave()
//     }
//   })

//   // Handle Escape to go back
//   useKeyPress("Escape", () => {
//     navigate("/dashboard")
//   })

//   useEffect(() => {
//     if (templateId && templateId !== "new") {
//       loadResume(templateId)
//     }
//   }, [templateId])

//   useEffect(() => {
//     if (currentResume) {
//       setResumeData(currentResume.data)
//       // Load template data based on templateId
//       // This would typically come from your template system
//       setTemplate({
//         id: currentResume.templateId,
//         name: "Professional Template",
//         colorScheme: {
//           primary: "#2563eb",
//           secondary: "#1e40af",
//           accent: "#ffd700",
//           text: "#ffffff",
//         },
//         layout: "two-column",
//         font: "Inter",
//       })
//     }
//   }, [currentResume])

//   const handleSave = async () => {
//     if (!currentResume || !resumeData) return

//     try {
//       await saveResume({
//         ...currentResume,
//         data: resumeData,
//       })
//     } catch (error) {
//       // Error handled in context
//     }
//   }

//   const handleExport = async () => {
//     if (!currentResume) return

//     try {
//       await exportToPDF(currentResume._id)
//     } catch (error) {
//       // Error handled in context
//     }
//   }

//   const handleSectionUpdate = (section, data) => {
//     setResumeData((prev) => ({
//       ...prev,
//       [section]: data,
//     }))
//     updateResumeSection(section, data)
//   }

//   const sections = [
//     { id: "personalInfo", label: "Personal Info", icon: User },
//     { id: "experience", label: "Experience", icon: Briefcase },
//     { id: "education", label: "Education", icon: GraduationCap },
//     { id: "skills", label: "Skills", icon: Code },
//     { id: "projects", label: "Projects", icon: FileText },
//     { id: "certifications", label: "Certifications", icon: Award },
//     { id: "languages", label: "Languages", icon: Globe },
//   ]

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
//           <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Loading editor...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!resumeData || !template) {
//     return (
//       <div
//         className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
//           theme === "dark"
//             ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//             : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//         }`}
//       >
//         <div className="text-center">
//           <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//           <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//             Resume not found
//           </h2>
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className={`min-h-screen pt-16 ${
//         theme === "dark"
//           ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
//           : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
//       }`}
//     >
//       {/* Header */}
//       <div
//         className={`sticky top-16 z-40 backdrop-blur-sm border-b ${
//           theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className={`p-2 rounded-full transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "text-gray-400 hover:text-white hover:bg-gray-700"
//                     : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
//                 }`}
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <div>
//                 <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//                   {currentResume?.title || "Untitled Resume"}
//                 </h1>
//                 <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//                   {isSaving ? "Saving..." : "All changes saved"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setShowPreview(!showPreview)}
//                 className={`p-2 rounded-full transition-colors duration-200 ${
//                   theme === "dark"
//                     ? "text-gray-400 hover:text-white hover:bg-gray-700"
//                     : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
//                 }`}
//                 title={showPreview ? "Hide Preview" : "Show Preview"}
//               >
//                 {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>

//               <button
//                 onClick={handleSave}
//                 disabled={isSaving}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
//                   theme === "dark"
//                     ? "bg-gray-700 text-white hover:bg-gray-600"
//                     : "bg-gray-200 text-gray-900 hover:bg-gray-300"
//                 } disabled:opacity-50`}
//               >
//                 <Save className="w-4 h-4" />
//                 {isSaving ? "Saving..." : "Save"}
//               </button>

//               <button
//                 onClick={handleExport}
//                 className="flex items-center gap-2 bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
//               >
//                 <Download className="w-4 h-4" />
//                 Export PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-12 gap-6 h-full">
//           {/* Sidebar */}
//           <div className="col-span-3">
//             <div
//               className={`sticky top-32 backdrop-blur-sm border rounded-2xl p-4 ${
//                 theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
//               }`}
//             >
//               <h3 className={`font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Resume Sections</h3>
//               <nav className="space-y-2">
//                 {sections.map((section) => {
//                   const Icon = section.icon
//                   return (
//                     <button
//                       key={section.id}
//                       onClick={() => setActiveSection(section.id)}
//                       className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 ${
//                         activeSection === section.id
//                           ? "bg-cinematic-gold text-black font-medium"
//                           : theme === "dark"
//                             ? "text-gray-300 hover:text-white hover:bg-gray-700"
//                             : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                       }`}
//                     >
//                       <Icon className="w-4 h-4" />
//                       {section.label}
//                     </button>
//                   )
//                 })}
//               </nav>
//             </div>
//           </div>

//           {/* Editor */}
//           <div className={`${showPreview ? "col-span-5" : "col-span-9"}`}>
//             <div
//               className={`backdrop-blur-sm border rounded-2xl p-6 ${
//                 theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
//               }`}
//             >
//               <SectionEditor section={activeSection} data={resumeData} onUpdate={handleSectionUpdate} theme={theme} />
//             </div>
//           </div>

//           {/* Preview */}
//           {showPreview && (
//             <div className="col-span-4">
//               <div
//                 className={`sticky top-32 backdrop-blur-sm border rounded-2xl overflow-hidden ${
//                   theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
//                 }`}
//               >
//                 <div className="p-4 border-b border-gray-700">
//                   <h3 className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Live Preview</h3>
//                 </div>
//                 <div className="h-96 overflow-auto">
//                   <TemplateRenderer template={template} data={resumeData} isPreview={true} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// // Section Editor Component
// const SectionEditor = ({ section, data, onUpdate, theme }) => {
//   const renderEditor = () => {
//     switch (section) {
//       case "personalInfo":
//         return (
//           <PersonalInfoEditor
//             data={data.personalInfo}
//             onUpdate={(newData) => onUpdate("personalInfo", newData)}
//             theme={theme}
//           />
//         )
//       case "experience":
//         return (
//           <ExperienceEditor
//             data={data.experience}
//             onUpdate={(newData) => onUpdate("experience", newData)}
//             theme={theme}
//           />
//         )
//       case "education":
//         return (
//           <EducationEditor data={data.education} onUpdate={(newData) => onUpdate("education", newData)} theme={theme} />
//         )
//       case "skills":
//         return <SkillsEditor data={data.skills} onUpdate={(newData) => onUpdate("skills", newData)} theme={theme} />
//       default:
//         return (
//           <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
//             Section editor coming soon...
//           </div>
//         )
//     }
//   }

//   return (
//     <div>
//       <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//         {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, " $1")}
//       </h2>
//       {renderEditor()}
//     </div>
//   )
// }

// // Personal Info Editor
// const PersonalInfoEditor = ({ data, onUpdate, theme }) => {
//   const handleChange = (field, value) => {
//     onUpdate({
//       ...data,
//       [field]: value,
//     })
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Full Name</label>
//           <input
//             type="text"
//             value={data?.fullName || ""}
//             onChange={(e) => handleChange("fullName", e.target.value)}
//             className={`form-input ${
//               theme === "dark"
//                 ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                 : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//             }`}
//             placeholder="Enter your full name"
//           />
//         </div>
//         <div>
//           <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</label>
//           <input
//             type="email"
//             value={data?.email || ""}
//             onChange={(e) => handleChange("email", e.target.value)}
//             className={`form-input ${
//               theme === "dark"
//                 ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                 : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//             }`}
//             placeholder="Enter your email"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Phone</label>
//           <input
//             type="tel"
//             value={data?.phone || ""}
//             onChange={(e) => handleChange("phone", e.target.value)}
//             className={`form-input ${
//               theme === "dark"
//                 ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                 : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//             }`}
//             placeholder="Enter your phone number"
//           />
//         </div>
//         <div>
//           <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Address</label>
//           <input
//             type="text"
//             value={data?.address || ""}
//             onChange={(e) => handleChange("address", e.target.value)}
//             className={`form-input ${
//               theme === "dark"
//                 ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                 : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//             }`}
//             placeholder="Enter your address"
//           />
//         </div>
//       </div>

//       <div>
//         <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//           Professional Summary
//         </label>
//         <textarea
//           value={data?.summary || ""}
//           onChange={(e) => handleChange("summary", e.target.value)}
//           rows={4}
//           className={`form-input resize-none ${
//             theme === "dark"
//               ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//               : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//           }`}
//           placeholder="Write a brief professional summary..."
//         />
//       </div>
//     </div>
//   )
// }

// // Experience Editor
// const ExperienceEditor = ({ data, onUpdate, theme }) => {
//   const addExperience = () => {
//     const newExperience = {
//       id: Date.now(),
//       company: "",
//       position: "",
//       startDate: "",
//       endDate: "",
//       current: false,
//       description: "",
//       location: "",
//     }
//     onUpdate([...data, newExperience])
//   }

//   const updateExperience = (index, field, value) => {
//     const updated = data.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
//     onUpdate(updated)
//   }

//   const removeExperience = (index) => {
//     onUpdate(data.filter((_, i) => i !== index))
//   }

//   return (
//     <div className="space-y-6">
//       {data?.map((experience, index) => (
//         <div
//           key={experience.id || index}
//           className={`border rounded-xl p-4 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//               Experience {index + 1}
//             </h4>
//             <button
//               onClick={() => removeExperience(index)}
//               className="text-red-500 hover:text-red-700 transition-colors duration-200"
//             >
//               Remove
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Company</label>
//               <input
//                 type="text"
//                 value={experience.company || ""}
//                 onChange={(e) => updateExperience(index, "company", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="Company name"
//               />
//             </div>
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Position</label>
//               <input
//                 type="text"
//                 value={experience.position || ""}
//                 onChange={(e) => updateExperience(index, "position", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="Job title"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Start Date</label>
//               <input
//                 type="month"
//                 value={experience.startDate || ""}
//                 onChange={(e) => updateExperience(index, "startDate", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white"
//                     : "bg-white border-gray-300 text-gray-900"
//                 }`}
//               />
//             </div>
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>End Date</label>
//               <input
//                 type="month"
//                 value={experience.endDate || ""}
//                 onChange={(e) => updateExperience(index, "endDate", e.target.value)}
//                 disabled={experience.current}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white disabled:opacity-50"
//                     : "bg-white border-gray-300 text-gray-900 disabled:opacity-50"
//                 }`}
//               />
//             </div>
//             <div className="flex items-center">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={experience.current || false}
//                   onChange={(e) => updateExperience(index, "current", e.target.checked)}
//                   className="rounded border-gray-300 text-cinematic-gold focus:ring-cinematic-gold"
//                 />
//                 <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//                   Current Position
//                 </span>
//               </label>
//             </div>
//           </div>

//           <div>
//             <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Description</label>
//             <textarea
//               value={experience.description || ""}
//               onChange={(e) => updateExperience(index, "description", e.target.value)}
//               rows={3}
//               className={`form-input resize-none ${
//                 theme === "dark"
//                   ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                   : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//               }`}
//               placeholder="Describe your responsibilities and achievements..."
//             />
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={addExperience}
//         className="w-full border-2 border-dashed border-gray-400 rounded-xl py-4 text-gray-500 hover:border-cinematic-gold hover:text-cinematic-gold transition-colors duration-200"
//       >
//         + Add Experience
//       </button>
//     </div>
//   )
// }

// // Education Editor
// const EducationEditor = ({ data, onUpdate, theme }) => {
//   const addEducation = () => {
//     const newEducation = {
//       id: Date.now(),
//       institution: "",
//       degree: "",
//       field: "",
//       startDate: "",
//       endDate: "",
//       gpa: "",
//       description: "",
//     }
//     onUpdate([...data, newEducation])
//   }

//   const updateEducation = (index, field, value) => {
//     const updated = data.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
//     onUpdate(updated)
//   }

//   const removeEducation = (index) => {
//     onUpdate(data.filter((_, i) => i !== index))
//   }

//   return (
//     <div className="space-y-6">
//       {data?.map((education, index) => (
//         <div
//           key={education.id || index}
//           className={`border rounded-xl p-4 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
//               Education {index + 1}
//             </h4>
//             <button
//               onClick={() => removeEducation(index)}
//               className="text-red-500 hover:text-red-700 transition-colors duration-200"
//             >
//               Remove
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//                 Institution
//               </label>
//               <input
//                 type="text"
//                 value={education.institution || ""}
//                 onChange={(e) => updateEducation(index, "institution", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="University/School name"
//               />
//             </div>
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Degree</label>
//               <input
//                 type="text"
//                 value={education.degree || ""}
//                 onChange={(e) => updateEducation(index, "degree", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="Bachelor's, Master's, etc."
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//                 Field of Study
//               </label>
//               <input
//                 type="text"
//                 value={education.field || ""}
//                 onChange={(e) => updateEducation(index, "field", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="Computer Science, Business, etc."
//               />
//             </div>
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//                 Graduation Year
//               </label>
//               <input
//                 type="number"
//                 value={education.endDate || ""}
//                 onChange={(e) => updateEducation(index, "endDate", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="2024"
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={addEducation}
//         className="w-full border-2 border-dashed border-gray-400 rounded-xl py-4 text-gray-500 hover:border-cinematic-gold hover:text-cinematic-gold transition-colors duration-200"
//       >
//         + Add Education
//       </button>
//     </div>
//   )
// }

// // Skills Editor
// const SkillsEditor = ({ data, onUpdate, theme }) => {
//   const addSkill = () => {
//     const newSkill = {
//       id: Date.now(),
//       name: "",
//       level: "Intermediate",
//       category: "",
//     }
//     onUpdate([...data, newSkill])
//   }

//   const updateSkill = (index, field, value) => {
//     const updated = data.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill))
//     onUpdate(updated)
//   }

//   const removeSkill = (index) => {
//     onUpdate(data.filter((_, i) => i !== index))
//   }

//   const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

//   return (
//     <div className="space-y-6">
//       {data?.map((skill, index) => (
//         <div
//           key={skill.id || index}
//           className={`border rounded-xl p-4 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Skill {index + 1}</h4>
//             <button
//               onClick={() => removeSkill(index)}
//               className="text-red-500 hover:text-red-700 transition-colors duration-200"
//             >
//               Remove
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Skill Name</label>
//               <input
//                 type="text"
//                 value={skill.name || ""}
//                 onChange={(e) => updateSkill(index, "name", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="JavaScript, Python, etc."
//               />
//             </div>
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Level</label>
//               <select
//                 value={skill.level || "Intermediate"}
//                 onChange={(e) => updateSkill(index, "level", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white"
//                     : "bg-white border-gray-300 text-gray-900"
//                 }`}
//               >
//                 {skillLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Category</label>
//               <input
//                 type="text"
//                 value={skill.category || ""}
//                 onChange={(e) => updateSkill(index, "category", e.target.value)}
//                 className={`form-input ${
//                   theme === "dark"
//                     ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
//                 }`}
//                 placeholder="Programming, Design, etc."
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={addSkill}
//         className="w-full border-2 border-dashed border-gray-400 rounded-xl py-4 text-gray-500 hover:border-cinematic-gold hover:text-cinematic-gold transition-colors duration-200"
//       >
//         + Add Skill
//       </button>
//     </div>
//   )
// }

// export default Editor






















"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Save,
  Download,
  Eye,
  EyeOff,
  ArrowLeft,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Globe,
} from "lucide-react"
import { useResume } from "../context/ResumeContext"
import { useTheme } from "../hooks/useTheme"
import { useKeyPress } from "../hooks/useKeyPress"
import { TemplateRenderer } from "../components/templates/TemplateGenerator"

const Editor = () => {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { currentResume, loadResume, saveResume, updateResumeSection, exportToPDF, isLoading, isSaving } = useResume()

  const [activeSection, setActiveSection] = useState("personalInfo")
  const [showPreview, setShowPreview] = useState(true)
  const [resumeData, setResumeData] = useState(null)
  const [template, setTemplate] = useState(null)

  // Handle Ctrl+S for save
  useKeyPress("s", (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      handleSave()
    }
  })

  // Handle Escape to go back
  useKeyPress("Escape", () => {
    navigate("/dashboard")
  })

  useEffect(() => {
    if (templateId && templateId !== "new") {
      loadResume(templateId)
    }
  }, [templateId])

  useEffect(() => {
    if (currentResume) {
      setResumeData(currentResume.data)
      // Load template data based on templateId
      setTemplate({
        id: currentResume.templateId,
        name: "Professional Template",
        colorScheme: {
          primary: "#2563eb",
          secondary: "#1e40af",
          accent: "#ffd700",
          text: "#ffffff",
        },
        layout: "two-column",
        font: "Inter",
      })
    }
  }, [currentResume])

  const handleSave = async () => {
    if (!currentResume || !resumeData) return

    try {
      await saveResume({
        ...currentResume,
        data: resumeData,
      })
    } catch (error) {
      // Error handled in context
    }
  }

  const handleExport = async () => {
    if (!currentResume) return

    try {
      await exportToPDF(currentResume._id)
    } catch (error) {
      // Error handled in context
    }
  }

  const handleSectionUpdate = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
    updateResumeSection(section, data)
  }

  const sections = [
    { id: "personalInfo", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "languages", label: "Languages", icon: Globe },
  ]

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
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Loading editor...</p>
        </div>
      </div>
    )
  }

  if (!resumeData || !template) {
    return (
      <div
        className={`min-h-screen pt-20 pb-12 px-4 flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
            : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}
      >
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Resume not found
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen pt-16 ${
        theme === "dark"
          ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      {/* Header */}
      <div
        className={`sticky top-16 z-40 backdrop-blur-sm border-b ${
          theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {currentResume?.title || "Untitled Resume"}
                </h1>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {isSaving ? "Saving..." : "All changes saved"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
                title={showPreview ? "Hide Preview" : "Show Preview"}
              >
                {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                } disabled:opacity-50`}
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Sidebar */}
          <div className="col-span-3">
            <div
              className={`sticky top-32 backdrop-blur-sm border rounded-2xl p-4 ${
                theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
              }`}
            >
              <h3 className={`font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Resume Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-cinematic-gold text-black font-medium"
                          : theme === "dark"
                            ? "text-gray-300 hover:text-white hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {section.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Editor */}
          <div className={`${showPreview ? "col-span-5" : "col-span-9"}`}>
            <div
              className={`backdrop-blur-sm border rounded-2xl p-6 ${
                theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
              }`}
            >
              <SectionEditor section={activeSection} data={resumeData} onUpdate={handleSectionUpdate} theme={theme} />
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="col-span-4">
              <div
                className={`sticky top-32 backdrop-blur-sm border rounded-2xl overflow-hidden ${
                  theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
                }`}
              >
                <div className="p-4 border-b border-gray-700">
                  <h3 className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Live Preview</h3>
                </div>
                <div className="h-96 overflow-auto">
                  <TemplateRenderer template={template} data={resumeData} isPreview={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Section Editor Component
const SectionEditor = ({ section, data, onUpdate, theme }) => {
  const renderEditor = () => {
    switch (section) {
      case "personalInfo":
        return (
          <PersonalInfoEditor
            data={data.personalInfo}
            onUpdate={(newData) => onUpdate("personalInfo", newData)}
            theme={theme}
          />
        )
      case "experience":
        return (
          <ExperienceEditor
            data={data.experience}
            onUpdate={(newData) => onUpdate("experience", newData)}
            theme={theme}
          />
        )
      case "education":
        return (
          <EducationEditor data={data.education} onUpdate={(newData) => onUpdate("education", newData)} theme={theme} />
        )
      case "skills":
        return <SkillsEditor data={data.skills} onUpdate={(newData) => onUpdate("skills", newData)} theme={theme} />
      default:
        return (
          <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Section editor coming soon...
          </div>
        )
    }
  }

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, " $1")}
      </h2>
      {renderEditor()}
    </div>
  )
}

// Personal Info Editor
const PersonalInfoEditor = ({ data, onUpdate, theme }) => {
  const handleChange = (field, value) => {
    onUpdate({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Full Name</label>
          <input
            type="text"
            value={data?.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`form-input ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</label>
          <input
            type="email"
            value={data?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`form-input ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Phone</label>
          <input
            type="tel"
            value={data?.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`form-input ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Address</label>
          <input
            type="text"
            value={data?.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            className={`form-input ${
              theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter your address"
          />
        </div>
      </div>

      <div>
        <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Professional Summary
        </label>
        <textarea
          value={data?.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
          rows={4}
          className={`form-input resize-none ${
            theme === "dark"
              ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
          placeholder="Write a brief professional summary..."
        />
      </div>
    </div>
  )
}

// Experience Editor
const ExperienceEditor = ({ data, onUpdate, theme }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    }
    onUpdate([...data, newExperience])
  }

  const updateExperience = (index, field, value) => {
    const updated = data.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
    onUpdate(updated)
  }

  const removeExperience = (index) => {
    onUpdate(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {data?.map((experience, index) => (
        <div
          key={experience.id || index}
          className={`border rounded-xl p-4 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Experience {index + 1}
            </h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Company</label>
              <input
                type="text"
                value={experience.company || ""}
                onChange={(e) => updateExperience(index, "company", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="Company name"
              />
            </div>
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Position</label>
              <input
                type="text"
                value={experience.position || ""}
                onChange={(e) => updateExperience(index, "position", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="Job title"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Start Date</label>
              <input
                type="month"
                value={experience.startDate || ""}
                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>End Date</label>
              <input
                type="month"
                value={experience.endDate || ""}
                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                disabled={experience.current}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white disabled:opacity-50"
                    : "bg-white border-gray-300 text-gray-900 disabled:opacity-50"
                }`}
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={experience.current || false}
                  onChange={(e) => updateExperience(index, "current", e.target.checked)}
                  className="rounded border-gray-300 text-cinematic-gold focus:ring-cinematic-gold"
                />
                <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Current Position
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Description</label>
            <textarea
              value={experience.description || ""}
              onChange={(e) => updateExperience(index, "description", e.target.value)}
              rows={3}
              className={`form-input resize-none ${
                theme === "dark"
                  ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full border-2 border-dashed border-gray-400 rounded-xl py-4 text-gray-500 hover:border-cinematic-gold hover:text-cinematic-gold transition-colors duration-200"
      >
        + Add Experience
      </button>
    </div>
  )
}

// Education Editor
const EducationEditor = ({ data, onUpdate, theme }) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    }
    onUpdate([...data, newEducation])
  }

  const updateEducation = (index, field, value) => {
    const updated = data.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    onUpdate(updated)
  }

  const removeEducation = (index) => {
    onUpdate(data.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {data?.map((education, index) => (
        <div
          key={education.id || index}
          className={`border rounded-xl p-4 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Education {index + 1}
            </h4>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Institution
              </label>
              <input
                type="text"
                value={education.institution || ""}
                onChange={(e) => updateEducation(index, "institution", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="University/School name"
              />
            </div>
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Degree</label>
              <input
                type="text"
                value={education.degree || ""}
                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Field of Study
              </label>
              <input
                type="text"
                value={education.field || ""}
                onChange={(e) => updateEducation(index, "field", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="Computer Science, Business, etc."
              />
            </div>
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Graduation Year
              </label>
              <input
                type="number"
                value={education.endDate || ""}
                onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="2024"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full border-2 border-dashed border-gray-400 rounded-xl py-4 text-gray-500 hover:border-cinematic-gold hover:text-cinematic-gold transition-colors duration-200"
      >
        + Add Education
      </button>
    </div>
  )
}

// Skills Editor
const SkillsEditor = ({ data, onUpdate, theme }) => {
  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: "",
      level: "Intermediate",
      category: "",
    }
    onUpdate([...data, newSkill])
  }

  const updateSkill = (index, field, value) => {
    const updated = data.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill))
    onUpdate(updated)
  }

  const removeSkill = (index) => {
    onUpdate(data.filter((_, i) => i !== index))
  }

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

  return (
    <div className="space-y-6">
      {data?.map((skill, index) => (
        <div
          key={skill.id || index}
          className={`border rounded-xl p-4 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Skill {index + 1}</h4>
            <button
              onClick={() => removeSkill(index)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Skill Name</label>
              <input
                type="text"
                value={skill.name || ""}
                onChange={(e) => updateSkill(index, "name", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="JavaScript, Python, etc."
              />
            </div>
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Level</label>
              <select
                value={skill.level || "Intermediate"}
                onChange={(e) => updateSkill(index, "level", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {skillLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={`form-label ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Category</label>
              <input
                type="text"
                value={skill.category || ""}
                onChange={(e) => updateSkill(index, "category", e.target.value)}
                className={`form-input ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="Programming, Design, etc."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="w-full border-2 border-dashed border-gray-400 rounded-xl py-4 text-gray-500 hover:border-cinematic-gold hover:text-cinematic-gold transition-colors duration-200"
      >
        + Add Skill
      </button>
    </div>
  )
}

export default Editor
