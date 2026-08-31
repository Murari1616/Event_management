

const { createPaymentOrder, verifyPayment } = require("../services/paymentService");
const catchAsync = require("../utils/catchAsync");
const {
  sendSuccessResponse,
} = require("../utils/response");

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

const createPaymentOrderController = catchAsync(
  async (req, res) => {
    const {
      eventId,
      gender,
    } = req.body;
    const paymentOrder =
      await createPaymentOrder({
        eventId,
        gender,
      });

    sendSuccessResponse(
      res,
      paymentOrder,
      200,
      "Payment order created successfully"
    );
  }
);

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

const verifyPaymentController = catchAsync(
  async (req, res) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      guestData,
    } = req.body;

    const guest =
      await verifyPayment({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        guestData,
      });

    sendSuccessResponse(
      res,
      guest,
      200,
      "Payment verified and registration completed successfully"
    );
  }
);

module.exports = {
  createPaymentOrderController,
  verifyPaymentController,
};
