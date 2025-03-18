const mongoose = require('mongoose');

// Define schema for lead data
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    enum: ['Website', 'Email', 'Social Media', 'Referral', 'Other']
  },
  score: {
    type: Number,
    default: 0
  },
  comments: {
    type: String,
    default: ''
  },
  sentiment: {
    type: String,
    enum: ['Positive', 'Negative', 'Neutral'],
    default: 'Neutral'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesRep',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model from schema
const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
