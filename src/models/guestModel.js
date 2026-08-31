const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["King", "Queen", "Couple"],
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    instaId: {
      type: String,
      required: true,
      trim: true,
    },

    place: {
      type: String,
      required: true,
      trim: true,
    },

    talent: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Amount actually paid
    amount: {
      type: Number,
      required: true,
    },

    // Razorpay fields
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpaySignature: {
      type: String,
      required: true,
    },

    approve: {
      type: Boolean,
      default: false,
    },

    payment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
