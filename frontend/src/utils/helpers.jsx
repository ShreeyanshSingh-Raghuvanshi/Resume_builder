// // /**
// //  * Formats a date string or Date object to "DD MMM YYYY" (e.g., "23 Jul 2025").
// //  * @param {string|Date} date - The date to format.
// //  * @returns {string} - Formatted date string.
// //  */
// // export function formatDate(date) {
// //   if (!date) return ""
// //   const d = new Date(date)
// //   const day = d.getDate().toString().padStart(2, "0")
// //   const month = d.toLocaleString("default", { month: "short" })
// //   const year = d.getFullYear()
// //   return `${day} ${month}



// // utils/helpers.jsx

// // Format a date string (ISO or JS Date) to "Month Year" format (e.g., "July 2025")
// export const formatDate = (dateInput) => {
//   if (!dateInput) return "";

//   const date = new Date(dateInput);

//   if (isNaN(date.getTime())) return "";

//   const options = { year: "numeric", month: "long" };
//   return date.toLocaleDateString("en-US", options);
// };


















// Date formatting utility
export const formatDate = (dateString) => {
  if (!dateString) return "N/A"

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "N/A"

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Format relative time
export const formatRelativeTime = (dateString) => {
  if (!dateString) return "N/A"

  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`

  return formatDate(dateString)
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ""
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + "..."
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Failed to remove from localStorage:", error)
    }
  },
}
