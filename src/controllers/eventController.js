const {
  createEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  updateEventStatus,
  deleteEvent,
} = require("../services/eventService");

const catchAsync = require("../utils/catchAsync");
const { sendSuccessResponse } = require("../utils/response");

// === Create Event ===
const createEventController = catchAsync(async (req, res) => {
  const event = await createEvent(req.body);
  sendSuccessResponse(res, event, 201, "Event created successfully");
});

// === Get All Events ===
const getAllEventsController = catchAsync(async (req, res) => {
  const events = await getAllEvents();
  sendSuccessResponse(res, events, 200, "Events fetched successfully");
});

// === Get Event By ID ===
const getEventByIdController = catchAsync(async (req, res) => {
  const event = await getEvent(req.params.id);
  sendSuccessResponse(res, event, 200, "Event fetched successfully");
});

// === Update Event ===
const updateEventController = catchAsync(async (req, res) => {
  const updatedEvent = await updateEvent(req.params.id, req.body);
  sendSuccessResponse(res, updatedEvent, 200, "Event updated successfully");
});

const updateEventStatusController = catchAsync(async (req, res) => {
  const updatedEvent = await updateEventStatus(req.params.id);
  sendSuccessResponse(res, updatedEvent, 200, "Event Status updated successfully");
});

// === Delete Event (Hard Delete) ===
const deleteEventController = catchAsync(async (req, res) => {
  const result = await deleteEvent(req.params.id);
  sendSuccessResponse(res, result, 200, "Event deleted successfully");
});

module.exports = {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  updateEventStatusController,
  deleteEventController,
};