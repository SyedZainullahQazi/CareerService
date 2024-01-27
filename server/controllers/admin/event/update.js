const ImageUpload =require("../../../utils/uploadImage");
const express = require('express');
const jwt = require('jsonwebtoken');
const EventModel = require('../../../models/event_model'); 
const UserModel =require('../../../models/user_model');

const UpdateEvent = async (req, res) => {
    try{
    const ImageURL=await ImageUpload(req.body.values.coverImage);
    const eventId = req.body.eventId
    console.log("-----------------------Update Blog Enpoint-------------");
    console.log("Update Point Hit");
    console.log(eventId);
    console.log("-----------------------Update Blog Enpoint-------------");

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findOne({ email_id: decodedToken.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user.rollnum);

        const updatedEvent = {
            postTitle: req.body.values.postTitle,
            postDescription: req.body.values.postDescription,
            postType: req.body.values.postType,
            scheduleType: req.body.values.scheduleType,
            scheduledDate: req.body.values.scheduledDate,
            scheduledTime: req.body.values.scheduledTime,
            coverImage:ImageURL,
            updateBy: user._id,
            updateDate: req.body.values.updateDate,
        };

        console.log(updatedEvent);
        const result = await EventModel.updateOne({ _id: eventId }, { $set: updatedEvent });

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Event not found or no changes were made' });
        }
    
        res.status(200).json({ message: 'Event updated successfully' });
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Failed Storing"});   
    }

}

module.exports = UpdateEvent;
