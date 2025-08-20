require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeMoralis } = require('./config/moralis');
const moralisRoutes = require('./routes/moralis');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/moralis', moralisRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'SN-API Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('💥 Server Error:', error);
  res.status(500).json({
    success: false,
    error: error.message,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Initialize Moralis and start server
const startServer = async () => {
  try {
    await initializeMoralis();
    
    app.listen(PORT, () => {
      console.log('🚀 Server started successfully');
      console.log(`📡 Server running on port ${PORT}`);
      console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
      console.log('🎯 Moralis endpoints:');
      console.log(`   GET /api/moralis/health`);
      console.log(`   GET /api/moralis/balance/:address`);
      console.log(`   GET /api/moralis/tokens/:address`);
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
};

startServer();