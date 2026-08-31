const Event = require("../models/eventModel");
const AppError = require("../utils/appError");

// === Create a new event ===
const createEvent = async (eventData) => {
  try {
    const event = await Event.create(eventData);
    return event;
  } catch (err) {
    throw new AppError("Failed to create event", 500, err);
  }
};

// === Update event by ID ===
const updateEvent = async (id, eventData) => {
  const event = await Event.findById(id);
  if (!event) {
    throw new AppError("Event not found", 404);
  }

  const updatedEvent = await Event.findByIdAndUpdate(id, eventData, {
    new: true,
  });

  return updatedEvent;
};

const updateEventStatus = async (id) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    {
      active: !event.active,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedEvent;
};


// === Soft delete event (set status to inactive) ===
const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return { message: "Event deleted successfully" };
};

// === Get event by ID ===
const getEventById = async (id) => {
  const event = await Event.findById(id);
  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

// === Get all events ===
const getAllEvents = async () => {
  return await Event.find().sort({ createdAt: -1 });
};

module.exports = {
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
  getEventById,
  getAllEvents,
};
