const express = require("express");

const {
  createPaymentOrderController,
  verifyPaymentController,
} = require("../controllers/paymentController");

const router = express.Router();

// Create Razorpay order
router.post(
  "/create-order",
  createPaymentOrderController
);

// Verify payment
router.post(
  "/verify",
  verifyPaymentController
);

module.exports = router;
