const AppError = require("../utils/appError");
const eventRepo = require("../repositories/eventRepo");

// === Create Event ===
async function createEvent(eventData) {
    const {
        eventName,
        malePrice,
        femalePrice,
        twoPeoplePrice,
        dateofEvent,
        location,
        locationLink,
        fromTime,
        toTime,
        registrationCount,
        deadline,
        active
    } = eventData;

    try {
        if (
            !eventName ||
            !malePrice ||
            !femalePrice ||
            !twoPeoplePrice ||
            !dateofEvent ||
            !location ||
            !locationLink ||
            !fromTime ||
            !toTime ||
            !registrationCount ||
            !deadline||
            !active
        ) {
            throw new AppError("All fields are required", 400);
        }

        const event = await eventRepo.createEvent({
            eventName,
            malePrice,
            femalePrice,
            twoPeoplePrice,
            dateofEvent,
            location,
            locationLink,
            fromTime,
            toTime,
            registrationCount,
            deadline,
            active
        });

        return {
            data: event,
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to create event", 500, error);
    }
}

// === Get Event by ID ===
async function getEvent(eventId) {
    try {
        if (!eventId) {
            throw new AppError("Event ID is required", 400);
        }

        const event = await eventRepo.getEventById(eventId);

        return event;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to fetch event", 500, error);
    }
}

// === Get All Events ===
async function getAllEvents() {
    try {
        const events = await eventRepo.getAllEvents();
        return events;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to fetch events", 500, error);
    }
}

// === Update Event ===
async function updateEvent(eventId, updateData) {
    try {
        if (!eventId) {
            throw new AppError("Event ID is required", 400);
        }

        const updatedEvent = await eventRepo.updateEvent(eventId, updateData);

        return updatedEvent;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to update event", 500, error);
    }
}

async function updateEventStatus(eventId) {
    try {
        if (!eventId) {
            throw new AppError("Event ID is required", 400);
        }

        const updatedEvent = await eventRepo.updateEventStatus(eventId);

        return updatedEvent;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to update event", 500, error);
    }
}

// === Delete Event (Hard Delete) ===
async function deleteEvent(eventId) {
    try {
        if (!eventId) {
            throw new AppError("Event ID is required", 400);
        }

        const result = await eventRepo.deleteEvent(eventId);

        return result;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to delete event", 500, error);
    }
}

module.exports = {
    createEvent,
    getEvent,
    getAllEvents,
    updateEvent,
    updateEventStatus,
    deleteEvent,
};
