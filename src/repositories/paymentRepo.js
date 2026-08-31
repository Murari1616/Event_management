const Payment = require("../models/paymentModel");

// Create payment record
const createPayment = async (paymentData) => {
  return await Payment.create(paymentData);
};

// Find payment using Razorpay order ID
const getPaymentByOrderId = async (razorpayOrderId) => {
  return await Payment.findOne({
    razorpayOrderId,
  });
};

// Find payment by ID
const getPaymentById = async (id) => {
  return await Payment.findById(id);
};

// Update payment
const updatePayment = async (id, updateData) => {
  return await Payment.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  createPayment,
  getPaymentByOrderId,
  getPaymentById,
  updatePayment,
};
