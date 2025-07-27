"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Crown, CreditCard } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import toast from "react-hot-toast"

const SubscriptionModal = ({ onClose, theme }) => {
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      period: "Forever",
      description: "Perfect for getting started",
      features: ["5 Free Templates", "Basic Customization", "PDF Export", "Email Support"],
      color: "from-gray-500 to-gray-600",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 999,
      period: "month",
      description: "Most popular choice for professionals",
      features: [
        "50+ Premium Templates",
        "Advanced Customization",
        "Multiple Export Formats",
        "Priority Support",
        "ATS Optimization",
        "Cover Letter Templates",
      ],
      color: "from-cinematic-gold to-yellow-500",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: 1999,
      period: "month",
      description: "Everything you need for career success",
      features: [
        "200+ Premium Templates",
        "Unlimited Customization",
        "All Export Formats",
        "24/7 Priority Support",
        "ATS Optimization",
        "Cover Letter Templates",
        "LinkedIn Profile Optimization",
        "Career Coaching Session",
      ],
      color: "from-purple-500 to-pink-500",
      popular: false,
    },
  ]

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Please login to subscribe")
      return
    }

    const plan = plans.find((p) => p.id === selectedPlan)
    if (plan.price === 0) {
      toast.success("You're already on the Basic plan!")
      onClose()
      return
    }

    setIsProcessing(true)

    try {
      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_1234567890",
        amount: plan.price * 100, // Amount in paise
        currency: "INR",
        name: "CineCV",
        description: `${plan.name} Plan Subscription`,
        image: "/logo.png",
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch("/api/subscription/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                plan: selectedPlan,
              }),
            })

            const result = await verifyResponse.json()

            if (result.success) {
              toast.success("Subscription activated successfully! 🎉", {
                duration: 5000,
              })
              onClose()
              // Refresh user data
              window.location.reload()
            } else {
              toast.error("Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast.error("Payment verification failed")
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          plan: selectedPlan,
          user_id: user.id,
        },
        theme: {
          color: "#ffd700",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      // Create order on backend first
      const orderResponse = await fetch("/api/subscription/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          plan: selectedPlan,
          amount: plan.price,
        }),
      })

      const orderData = await orderResponse.json()

      if (orderData.success) {
        options.order_id = orderData.order_id

        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        throw new Error("Failed to create order")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      toast.error("Failed to process subscription")
      setIsProcessing(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="payment-modal">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="payment-backdrop"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`payment-content ${theme === "dark" ? "payment-content-dark" : "payment-content-light"} max-w-4xl`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Choose Your Plan
              </h2>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Unlock premium templates and advanced features
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark" ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? theme === "dark"
                      ? "bg-gray-700 border-2 border-cinematic-gold"
                      : "bg-blue-50 border-2 border-cinematic-gold"
                    : theme === "dark"
                      ? "bg-gray-800 border border-gray-700 hover:border-gray-600"
                      : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      ₹{plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`w-full py-2 px-4 rounded-lg text-center font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? "bg-cinematic-gold text-black"
                      : theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubscribe}
              disabled={isProcessing}
              className={`bg-gradient-to-r ${plans.find((p) => p.id === selectedPlan)?.color} text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isProcessing ? (
                <div className="loading-spinner w-6 h-6 border-2 border-black/20 border-t-black"></div>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  {plans.find((p) => p.id === selectedPlan)?.price === 0
                    ? "Continue with Basic"
                    : `Subscribe for ₹${plans.find((p) => p.id === selectedPlan)?.price}`}
                </>
              )}
            </motion.button>

            <p className={`text-xs mt-4 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              Secure payment powered by Razorpay. Cancel anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default SubscriptionModal
