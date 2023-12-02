const mongoose = require('mongoose');

// Define the schema for the User
const userInfoSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
});

// Create the User model using the schema
const User = mongoose.model('User', userInfoSchema);

module.exports = User;
