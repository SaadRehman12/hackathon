var express = require('express');
var authVerify = require('../middlewares/auth');
const { fetchEvents, createEvent, updateEvent, deleteEvent, fetchUpcomingEvents, fetchPastEvents, fetchEventsByExactDate, fetchEventsByCategory } = require('../controllers/eventController');

var todoRouter = express.Router();
todoRouter.get('/fetch',  fetchEvents);
todoRouter.post('/create',  createEvent);
todoRouter.put('/update/:id', updateEvent);
todoRouter.delete('/delete/:id',  deleteEvent);
todoRouter.get('/fetch/upComing',  fetchUpcomingEvents);
todoRouter.get('/fetch/past',  fetchPastEvents);
todoRouter.get('/fetch/byDate', fetchEventsByExactDate);
todoRouter.get('/fetch/byCategory',  fetchEventsByCategory);
module.exports = todoRouter;