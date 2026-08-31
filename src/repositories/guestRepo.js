const Guest = require("../models/guestModel");
const AppError = require("../utils/appError");

// === Create a new guest ===
const createGuest = async (guestData) => {
  try {
    const guest = await Guest.create(guestData);
    return guest;
  } catch (err) {
    throw new AppError("Failed to create guest", 500, err);
  }
};

// === Update guest by ID ===
const updateGuest = async (id, guestData) => {
  const guest = await Guest.findById(id);
  if (!guest) {
    throw new AppError("Guest not found", 404);
  }

  const updatedGuest = await Guest.findByIdAndUpdate(id, guestData, {
    new: true,
  });

  return updatedGuest;
};


// === Soft delete guest (set status to inactive) ===
const deleteGuest = async (id) => {
  const guest = await Guest.findByIdAndDelete(id);

  if (!guest) {
    throw new AppError("Guest not found", 404);
  }

  return { message: "Guest deleted successfully" };
};

// === Get guest by ID ===
const getGuestById = async (id) => {
  const guest = await Guest.findById(id);
  if (!guest) {
    throw new AppError("Guest not found", 404);
  }

  return guest;
};

// === Get all guests ===
const getAllGuests = async () => {
  return await Guest.find()
    .populate({
      path: "eventId",
      select: "eventName",
    })
    .sort({ createdAt: -1 });
};

module.exports = {
  createGuest,
  updateGuest,
  deleteGuest,
  getGuestById,
  getAllGuests,
};
