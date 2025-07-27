// "use client"

// import { createContext, useContext, useState } from "react"
// import { api } from "../utils/api"
// import toast from "react-hot-toast"

// export const ResumeContext = createContext()

// export const useResume = () => {
//   const context = useContext(ResumeContext)
//   if (!context) {
//     throw new Error("useResume must be used within a ResumeProvider")
//   }
//   return context
// }

// export const ResumeProvider = ({ children }) => {
//   const [currentResume, setCurrentResume] = useState(null)
//   const [resumes, setResumes] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)

//   // Default resume structure
//   const defaultResumeData = {
//     personalInfo: {
//       fullName: "",
//       email: "",
//       phone: "",
//       address: "",
//       website: "",
//       linkedin: "",
//       github: "",
//       summary: "",
//     },
//     experience: [],
//     education: [],
//     skills: [],
//     projects: [],
//     certifications: [],
//     languages: [],
//     awards: [],
//     references: [],
//   }

//   // Create new resume
//   const createResume = async (templateId, title = "Untitled Resume") => {
//     setIsLoading(true)
//     try {
//       const response = await api.post("/resumes", {
//         title,
//         templateId,
//         data: defaultResumeData,
//       })

//       const newResume = response.data.resume
//       setCurrentResume(newResume)
//       setResumes((prev) => [newResume, ...prev])

//       toast.success("Resume created successfully!")
//       return newResume
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create resume")
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Load resume
//   const loadResume = async (resumeId) => {
//     setIsLoading(true)
//     try {
//       const response = await api.get(`/resumes/${resumeId}`)
//       const resume = response.data.resume
//       setCurrentResume(resume)
//       return resume
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load resume")
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Save resume
//   const saveResume = async (resumeData) => {
//     if (!currentResume) return

//     setIsSaving(true)
//     try {
//       const response = await api.put(`/resumes/${currentResume._id}`, resumeData)
//       const updatedResume = response.data.resume

//       setCurrentResume(updatedResume)
//       setResumes((prev) => prev.map((resume) => (resume._id === updatedResume._id ? updatedResume : resume)))

//       toast.success("Resume saved successfully!")
//       return updatedResume
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to save resume")
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // Auto-save functionality
//   const autoSave = async (resumeData) => {
//     if (!currentResume || isSaving) return

//     try {
//       await api.put(`/resumes/${currentResume._id}`, resumeData)
//       setCurrentResume((prev) => ({ ...prev, ...resumeData }))
//     } catch (error) {
//       console.error("Auto-save failed:", error)
//     }
//   }

//   // Delete resume
//   const deleteResume = async (resumeId) => {
//     try {
//       await api.delete(`/resumes/${resumeId}`)
//       setResumes((prev) => prev.filter((resume) => resume._id !== resumeId))

//       if (currentResume?._id === resumeId) {
//         setCurrentResume(null)
//       }

//       toast.success("Resume deleted successfully!")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete resume")
//       throw error
//     }
//   }

//   // Get all user resumes
//   const fetchResumes = async () => {
//     setIsLoading(true)
//     try {
//       const response = await api.get("/resumes")
//       setResumes(response.data.resumes)
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch resumes")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Update resume section
//   const updateResumeSection = (section, data) => {
//     if (!currentResume) return

//     const updatedData = {
//       ...currentResume.data,
//       [section]: data,
//     }

//     setCurrentResume((prev) => ({
//       ...prev,
//       data: updatedData,
//     }))

//     // Auto-save after 2 seconds of inactivity
//     const timeoutId = setTimeout(() => {
//       autoSave({ data: updatedData })
//     }, 2000)

//     return () => clearTimeout(timeoutId)
//   }

//   // Export resume as PDF
//   const exportToPDF = async (resumeId) => {
//     try {
//       const response = await api.get(`/resumes/${resumeId}/export`, {
//         responseType: "blob",
//       })

//       const blob = new Blob([response.data], { type: "application/pdf" })
//       const url = window.URL.createObjectURL(blob)
//       const link = document.createElement("a")
//       link.href = url
//       link.download = `${currentResume?.title || "resume"}.pdf`
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//       window.URL.revokeObjectURL(url)

//       toast.success("Resume downloaded successfully!")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to export resume")
//       throw error
//     }
//   }

//   const value = {
//     currentResume,
//     resumes,
//     isLoading,
//     isSaving,
//     createResume,
//     loadResume,
//     saveResume,
//     autoSave,
//     deleteResume,
//     fetchResumes,
//     updateResumeSection,
//     exportToPDF,
//     setCurrentResume,
//   }

//   return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
// }
























"use client"

import { createContext, useContext, useState } from "react"
import { api } from "../utils/api"
import toast from "react-hot-toast"

const ResumeContext = createContext()

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}

export const ResumeProvider = ({ children }) => {
  const [currentResume, setCurrentResume] = useState(null)
  const [resumes, setResumes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Default resume structure
  const defaultResumeData = {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      linkedin: "",
      github: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    references: [],
  }

  // Create new resume
  const createResume = async (templateId, title = "Untitled Resume") => {
    setIsLoading(true)
    try {
      const response = await api.post("/resumes", {
        title,
        templateId,
        data: defaultResumeData,
      })

      const newResume = response.data.resume
      setCurrentResume(newResume)
      setResumes((prev) => [newResume, ...prev])

      toast.success("Resume created successfully!")
      return newResume
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create resume")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Load resume
  const loadResume = async (resumeId) => {
    setIsLoading(true)
    try {
      const response = await api.get(`/resumes/${resumeId}`)
      const resume = response.data.resume
      setCurrentResume(resume)
      return resume
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load resume")
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Save resume
  const saveResume = async (resumeData) => {
    if (!currentResume) return

    setIsSaving(true)
    try {
      const response = await api.put(`/resumes/${currentResume._id}`, resumeData)
      const updatedResume = response.data.resume

      setCurrentResume(updatedResume)
      setResumes((prev) => prev.map((resume) => (resume._id === updatedResume._id ? updatedResume : resume)))

      toast.success("Resume saved successfully!")
      return updatedResume
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save resume")
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  // Auto-save functionality
  const autoSave = async (resumeData) => {
    if (!currentResume || isSaving) return

    try {
      await api.put(`/resumes/${currentResume._id}`, resumeData)
      setCurrentResume((prev) => ({ ...prev, ...resumeData }))
    } catch (error) {
      console.error("Auto-save failed:", error)
    }
  }

  // Delete resume
  const deleteResume = async (resumeId) => {
    try {
      await api.delete(`/resumes/${resumeId}`)
      setResumes((prev) => prev.filter((resume) => resume._id !== resumeId))

      if (currentResume?._id === resumeId) {
        setCurrentResume(null)
      }

      toast.success("Resume deleted successfully!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete resume")
      throw error
    }
  }

  // Get all user resumes
  const fetchResumes = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/resumes")
      setResumes(response.data.resumes || [])
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch resumes")
      setResumes([])
    } finally {
      setIsLoading(false)
    }
  }

  // Update resume section
  const updateResumeSection = (section, data) => {
    if (!currentResume) return

    const updatedData = {
      ...currentResume.data,
      [section]: data,
    }

    setCurrentResume((prev) => ({
      ...prev,
      data: updatedData,
    }))

    // Auto-save after 2 seconds of inactivity
    const timeoutId = setTimeout(() => {
      autoSave({ data: updatedData })
    }, 2000)

    return () => clearTimeout(timeoutId)
  }

  // Export resume as PDF
  const exportToPDF = async (resumeId) => {
    try {
      const response = await api.get(`/resumes/${resumeId}/export`)

      // For now, just show success message
      // In production, this would handle actual PDF download
      toast.success("Resume export initiated!")

      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to export resume")
      throw error
    }
  }

  const value = {
    currentResume,
    resumes,
    isLoading,
    isSaving,
    createResume,
    loadResume,
    saveResume,
    autoSave,
    deleteResume,
    fetchResumes,
    updateResumeSection,
    exportToPDF,
    setCurrentResume,
  }

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}
