const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
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
      enum: ["King", "Queen", "Other","Couple"],
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
    payment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const guestModel = mongoose.model("Guest", guestSchema);

module.exports = guestModel;
