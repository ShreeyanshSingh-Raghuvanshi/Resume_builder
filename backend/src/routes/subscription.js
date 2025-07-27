const express = require("express")
const crypto = require("crypto")
const Razorpay = require("razorpay")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret_key",
})

// Create subscription order
router.post("/create-order", auth, async (req, res) => {
  try {
    const { plan, amount } = req.body

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan,
        userId: req.user.id,
      },
    }

    const order = await razorpay.orders.create(options)

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("Create order error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    })
  }
})

// Verify payment and activate subscription
router.post("/verify", auth, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, plan } = req.body

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "test_secret_key")
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      })
    }

    // Update user subscription
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Calculate subscription end date
    const now = new Date()
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days

    user.subscription = {
      plan,
      active: true,
      startDate: now,
      endDate,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    }

    await user.save()

    res.json({
      success: true,
      message: "Subscription activated successfully",
      subscription: user.subscription,
    })
  } catch (error) {
    console.error("Verify payment error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    })
  }
})

// Get subscription status
router.get("/status", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    res.json({
      success: true,
      subscription: user.subscription || {
        plan: "basic",
        active: false,
      },
    })
  } catch (error) {
    console.error("Get subscription status error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get subscription status",
    })
  }
})

// Cancel subscription
router.post("/cancel", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (user.subscription) {
      user.subscription.active = false
      user.subscription.cancelledAt = new Date()
      await user.save()
    }

    res.json({
      success: true,
      message: "Subscription cancelled successfully",
    })
  } catch (error) {
    console.error("Cancel subscription error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to cancel subscription",
    })
  }
})

module.exports = router
