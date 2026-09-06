const AppError = require("../utils/appError");
const guestRepo = require("../repositories/guestRepo");

// === Create Guest ===
async function createGuest(guestData) {
  const {
    eventId,
    name,
    age,
    gender,
    phoneNumber,
    instaId,
    place,
    talent,
    description,
  } = guestData;

  try {
    if (
      !eventId||
      !name ||
      !age ||
      !gender ||
      !phoneNumber ||
      !instaId ||
      !place ||
      !talent ||
      !description
    ) {
      throw new AppError("All fields are required", 400);
    }

    const guest = await guestRepo.createGuest({
      eventId,
      name,
      age,
      gender,
      phoneNumber,
      instaId,
      place,
      talent,
      description,
    });

    return {
      data: guest,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to create guest", 500, error);
  }
}

// === Get Guest by ID ===
async function getGuest(guestId) {
  try {
    if (!guestId) {
      throw new AppError("Guest ID is required", 400);
    }

    const guest = await guestRepo.getGuestById(guestId);

    return guest;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to fetch guest", 500, error);
  }
}

// === Get All Guests ===
async function getAllGuests() {
  try {
    const guests = await guestRepo.getAllGuests();
    return guests;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to fetch guests", 500, error);
  }
}

// === Update Guest ===
async function updateGuest(guestId, updateData) {
  try {
    if (!guestId) {
      throw new AppError("Guest ID is required", 400);
    }

    const updatedGuest = await guestRepo.updateGuest(guestId, updateData);

    return updatedGuest;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to update guest", 500, error);
  }
}

// === Delete Guest (Hard Delete) ===
async function deleteGuest(guestId) {
  try {
    if (!guestId) {
      throw new AppError("Guest ID is required", 400);
    }

    const result = await guestRepo.deleteGuest(guestId);

    return result;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to delete guest", 500, error);
  }
}

module.exports = {
  createGuest,
  getGuest,
  getAllGuests,
  updateGuest,
  deleteGuest,
};
