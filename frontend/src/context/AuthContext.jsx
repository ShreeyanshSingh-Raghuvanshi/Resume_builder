// "use client"

// import { createContext, useContext, useState, useEffect } from "react"
// import { api } from "../utils/api"

// export const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       // Verify token and get user data
//       api
//         .get("/auth/me")
//         .then((response) => {
//           setUser(response.data.user)
//         })
//         .catch(() => {
//           localStorage.removeItem("token")
//         })
//         .finally(() => {
//           setLoading(false)
//         })
//     } else {
//       setLoading(false)
//     }
//   }, [])

//   const login = async (email, password) => {
//     try {
//       const response = await api.post("/auth/login", { email, password })
//       const { token, user } = response.data

//       localStorage.setItem("token", token)
//       setUser(user)

//       return { success: true }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.message || "Login failed",
//       }
//     }
//   }

//   const signup = async (name, email, password) => {
//     try {
//       const response = await api.post("/auth/signup", { name, email, password })
//       const { token, user } = response.data

//       localStorage.setItem("token", token)
//       setUser(user)

//       return { success: true }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.message || "Signup failed",
//       }
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     setUser(null)
//   }

//   const value = {
//     user,
//     login,
//     signup,
//     logout,
//     loading,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }































"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../utils/api"

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // Verify token and get user data
      api
        .get("/auth/me")
        .then((response) => {
          setUser(response.data.user)
        })
        .catch(() => {
          localStorage.removeItem("token")
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      setUser(user)

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
        needsVerification: error.response?.data?.needsVerification || false,
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await api.post("/auth/signup", { name, email, password })

      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

