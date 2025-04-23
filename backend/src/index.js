require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection, initDatabase } = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    await testConnection();
    await initDatabase();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 