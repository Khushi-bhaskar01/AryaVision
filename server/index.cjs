require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const entriesRoutes = require('./routes/entries.cjs');

const app = express();
const PORT = process.env.PORT || 5000;


// // Routes
// app.use('/api/', authRoutes);
// app.use('/api/entries', entriesRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/moodtracker';
    await mongoose.connect(connectionString);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'production' ? {} : err 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});