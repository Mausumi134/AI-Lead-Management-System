const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mausumighadei:mausumi@cluster0.c47o5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
