const Event = require('../models/eventHandling');
const mongoose = require('mongoose');
const fetchEvents = async (req, res) => {
    try {
        const userId = req.body.user?.userId; // Current logged-in user ID
        const events = await Event.find({
            $or: [
                { visibility: "public" }, // Public events
                { createdBy: userId },    // Private events created by the user
            ],
        });
        res.json({
            data: events,
            status: "success",
        });
    } catch (error) {
        res.json({
            data: [],
            status: "error",
            error: error.message,
        });
    }
};

const fetchUpcomingEvents = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
  
      const upcomingEvents = await Event.find({
        date: { $gte: today },
      }).sort({ date: 1 }); // Sort by ascending date
  
      res.json({
        data: upcomingEvents,
        status: "success",
      });
    } catch (error) {
      res.json({
        data: [],
        status: "error",
        error: error.message,
      });
    }
  };
  

  const fetchPastEvents = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
  
      const pastEvents = await Event.find({
        date: { $lt: today },
      }).sort({ date: -1 }); // Sort by descending date
  
      res.json({
        data: pastEvents,
        status: "success",
      });
    } catch (error) {
      res.json({
        data: [],
        status: "error",
        error: error.message,
      });
    }
  };
  
  const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, visibility } = req.body;

        // Validate `userId`
        // if (!req.body.user?.userId) {
        //     return res.json({
        //         data: null,
        //         status: "error",
        //         error: "User ID is required for creating an event",
        //     });
        // }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            category,
            visibility, 
        });

        const savedEvent = await newEvent.save();
        res.json({
            data: savedEvent,
            status: "success",
        });
    } catch (error) {
        res.json({
            data: null,
            status: "error",
            error: error.message,
        });
    }
};

const fetchEventsByExactDate = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.json({
                data: [],
                status: "error",
                error: "Date is required",
            });
        }

        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0); // Start of the target date
        const nextDate = new Date(targetDate);
        nextDate.setDate(targetDate.getDate() + 1); // Start of the next day

        const events = await Event.find({
            date: { $gte: targetDate, $lt: nextDate },
        }).sort({ date: 1 }); // Sort by ascending date

        res.json({
            data: events,
            status: "success",
        });
    } catch (error) {
        res.json({
            data: [],
            status: "error",
            error: error.message,
        });
    }
};
const fetchEventsByCategory = async (req, res) => {
    try {
      const { category } = req.query;
  
      if (!category) {
        return res.json({
          data: [],
          status: "error",
          error: "Category is required.",
        });
      }
  
      const events = await Event.find({
        category: { $regex: new RegExp(`^${category}$`, 'i') },
      }).sort({ date: 1 });
  
      res.json({
        data: events,
        status: "success",
      });
    } catch (error) {
      res.json({
        data: [],
        status: "error",
        error: error.message,
      });
    }
  };
// Update an event
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        res.json({
            data: updatedEvent,
            status: "success",
        });
    } catch (error) {
        res.json({
            data: null,
            status: "error",
            error: error.message,
        });
    }
};
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure `id` is provided
        if (!id) {
            return res.json({
                data: null,
                status: "error",
                error: "Event ID is required",
            });
        }

        // Find and delete event by `id` (string match)
        const deletedEvent = await Event.findOneAndDelete({ id });

        if (!deletedEvent) {
            return res.json({
                data: null,
                status: "error",
                error: "Event not found",
            });
        }

        res.json({
            data: null,
            status: "success",
            message: "Event deleted successfully",
        });
    } catch (error) {
        res.json({
            data: null,
            status: "error",
            error: error.message,
        });
    }
};

module.exports = {
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    fetchUpcomingEvents,
    fetchPastEvents,
    fetchEventsByExactDate,
    fetchEventsByCategory
};