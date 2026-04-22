const {
  createGuestController,
  getAllGuestsController,
  getGuestByIdController,
  updateGuestController,
  deleteGuestController,
} = require("../controllers/guestController");

const express = require("express");
const router = express.Router();

// === Guest CRUD Routes ===

// Create guest
router.post("/create", createGuestController);

// Get all guests
router.get("/getAll", getAllGuestsController);

// Get guest by ID
router.get("/get/:id", getGuestByIdController);

// Update guest
router.put("/update/:id", updateGuestController);

// Delete guest (hard delete)
router.delete("/delete/:id", deleteGuestController);

module.exports = router;