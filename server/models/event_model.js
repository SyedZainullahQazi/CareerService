const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postDescription: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  scheduleType: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const currentDate = new Date();
        return value && value >= currentDate;
      },
      message: 'Scheduled Date cannot be in the past',
    },
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: new Date(),
  },
  updateDate:{
    type: Date,
  },
  coverImage: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  updateBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: false,
  },
});

const Event = mongoose.model('events', eventSchema);

module.exports =Event;
