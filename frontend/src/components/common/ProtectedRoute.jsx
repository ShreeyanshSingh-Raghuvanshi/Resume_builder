// "use client"

// import { Navigate } from "react-router-dom"
// import { useAuth } from "../../hooks/useAuth"
// import LoadingSpinner from "./LoadingSpinner"

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return <LoadingSpinner />
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />
//   }

//   if (!user.emailVerified) {
//     return <Navigate to="/verify-email" replace />
//   }

//   return children
// }

// export default ProtectedRoute




















"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import LoadingSpinner from "./LoadingSpinner"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
