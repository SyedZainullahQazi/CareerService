const ImageUpload =require("../../../utils/uploadImage");
const express = require('express');
const jwt = require('jsonwebtoken');
const EventModel = require('../../../models/event_model'); 
const UserModel =require('../../../models/user_model');

const CreateEvent = async (req, res) => {
    // console.log("-----------------------Create Blog Enpoint-------------");
    // console.log(req.body.values);
    // console.log("-----------------------Create Blog Enpoint-------------");
    try{
    const ImageURL=await ImageUpload(req.body.values.coverImage);
    console.log("-----------------------Create Blog Enpoint-------------");
    console.log("Point Hit");
    console.log("-----------------------Create Blog Enpoint-------------");
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findOne({ email_id: decodedToken.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user.rollnum);
        const newEvent = new EventModel({
            postTitle: req.body.values.postTitle,
            postDescription: req.body.values.postDescription,
            postType: req.body.values.postType,
            scheduleType: req.body.values.scheduleType,
            scheduledDate: req.body.values.scheduledDate,
            scheduledTime: req.body.values.scheduledTime,
            postDate: req.body.values.postDate,
            coverImage: req.body.values.coverImage,
            postedBy: user._id, // Set the postedBy field to the user's ObjectId
        });

        console.log("This Point");
        const savedEvent = await newEvent.save();
        console.log("Event Saved");
        res.status(201).json(savedEvent);
    }
    catch{
        res.status(400).json({message:"Failed Storing"});   
    }

}

module.exports = CreateEvent;
