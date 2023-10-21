const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    default: null,
  },
  profilepicture: {
    type: String,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
  rollnum: {
    type: String,
  },
  usertype: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
