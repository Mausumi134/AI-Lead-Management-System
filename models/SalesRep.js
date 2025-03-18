const mongoose = require('mongoose');

// Define schema for sales representative
const salesRepSchema = new mongoose.Schema({
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
  assignedLeads: {
    type: Number,
    default: 0
  }
});

// Create model from schema
const SalesRep = mongoose.model('SalesRep', salesRepSchema);

module.exports = SalesRep;
