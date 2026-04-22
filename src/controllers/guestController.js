const {
  createGuest,
  getGuest,
  getAllGuests,
  updateGuest,
  deleteGuest,
} = require("../services/guestService");

const catchAsync = require("../utils/catchAsync");
const { sendSuccessResponse } = require("../utils/response");

// === Create Guest ===
const createGuestController = catchAsync(async (req, res) => {
  const guest = await createGuest(req.body);
  sendSuccessResponse(res, guest, 201, "Guest created successfully");
});

// === Get All Guests ===
const getAllGuestsController = catchAsync(async (req, res) => {
  const guests = await getAllGuests();
  sendSuccessResponse(res, guests, 200, "Guests fetched successfully");
});

// === Get Guest By ID ===
const getGuestByIdController = catchAsync(async (req, res) => {
  const guest = await getGuest(req.params.id);
  sendSuccessResponse(res, guest, 200, "Guest fetched successfully");
});

// === Update Guest ===
const updateGuestController = catchAsync(async (req, res) => {
  const updatedGuest = await updateGuest(req.params.id, req.body);
  sendSuccessResponse(res, updatedGuest, 200, "Guest updated successfully");
});

// === Delete Guest (Hard Delete) ===
const deleteGuestController = catchAsync(async (req, res) => {
  const result = await deleteGuest(req.params.id);
  sendSuccessResponse(res, result, 200, "Guest deleted successfully");
});

module.exports = {
  createGuestController,
  getAllGuestsController,
  getGuestByIdController,
  updateGuestController,
  deleteGuestController,
};