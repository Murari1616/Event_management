const {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
  updateEventStatusController,
} = require("../controllers/eventController");

const express = require("express");
const router = express.Router();

// === Event CRUD Routes ===

// Create event
router.post("/create", createEventController);

// Get all events
router.get("/getAll", getAllEventsController);

// Get event by ID
router.get("/get/:id", getEventByIdController);

// Update event
router.put("/update/:id", updateEventController);

// Update event status
router.put("/updateStatus/:id", updateEventStatusController);

// Delete event (hard delete)
router.delete("/delete/:id", deleteEventController);

module.exports = router;