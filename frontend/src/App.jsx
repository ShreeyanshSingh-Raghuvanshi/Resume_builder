"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/AuthContext"
import { ResumeProvider } from "./context/ResumeContext"
import { ThemeProvider } from "./context/ThemeContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import EmailVerification from "./pages/EmailVerification"
import Dashboard from "./pages/Dashboard"
import Editor from "./pages/Editor"
import Templates from "./pages/Templates"
import ProtectedRoute from "./components/common/ProtectedRoute"
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import LoadingSpinner from "./components/common/LoadingSpinner"
import { useAuth } from "./hooks/useAuth"
import { useTheme } from "./hooks/useTheme"

function AppContent() {
  const { loading } = useAuth()
  const { theme } = useTheme()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-cinematic-dark via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/templates" element={<Templates />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:templateId?"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#fff" : "#1f2937",
            border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: theme === "dark" ? "#fff" : "#1f2937",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: theme === "dark" ? "#fff" : "#1f2937",
            },
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <AppContent />
          </Router>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
