const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a pet name'],
    trim: true
  },
  species: {
    type: String,
    required: [true, 'Please provide a species'],
    enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other']
  },
  breed: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Please provide age'],
    min: 0
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unknown']
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted'],
    default: 'available'
  },
  image: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);

