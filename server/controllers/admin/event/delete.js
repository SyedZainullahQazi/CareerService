const express = require('express');
const jwt = require('jsonwebtoken');
const EventModel = require('../../../models/event_model');
const UserModel = require('../../../models/user_model');

const DeleteEvent = async (req, res) => {
    try {
        // Extract the event ID from the request parameters
        const eventId = req.body.values;
        console.log(req.body);

        // Check if the event ID is valid
        if (!eventId) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        // Check if the event with the given ID exists and belongs to the logged-in user
        const event = await EventModel.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).json({ error: 'Event not found or unauthorized' });
        }

        // Delete the event
        await EventModel.deleteOne({ _id: eventId });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = DeleteEvent;
