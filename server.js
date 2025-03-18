const express = require('express');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const cors = require('cors');


const app = express();
const PORT = 3000;
app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware to read JSON data
app.use(express.json());

// API Routes
app.use('/api', leadRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
