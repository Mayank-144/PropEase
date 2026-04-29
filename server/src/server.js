import 'dotenv/config.js';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { initSocket } from './config/socket.js';
import { logger } from './utils/logger.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import dns from 'dns';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dns.setDefaultResultOrder('ipv4first');

// Import routes
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/properties.js';
import paymentRoutes from './routes/payment.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';
import messageRoutes from './routes/messages.js';

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

/**
 * Middleware Setup
 */

// CORS configuration
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes Setup
 */

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);

/**
 * Health Check Endpoint
 */

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Root Endpoint
 */

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'PropEase API Server',
    version: '1.0.0'
  });
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  const clientPath = path.join(__dirname, '../../client/dist');

  // Debug check
  if (!fs.existsSync(clientPath)) {
    console.error(`🔴 PRODUCTION ERROR: Frontend build directory not found at ${clientPath}`);
    app.get('/', (req, res) => {
      res.status(500).send("Frontend build missing. Please make sure 'npm run build' ran successfully during deployment.");
    });
  } else {
    app.use(express.static(clientPath));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ success: false, message: 'API Route Not Found' });
      }
      res.sendFile(path.resolve(clientPath, 'index.html'));
    });
  }
}

/**
 * Error Handling Middlewares
 */

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

/**
 * Database Connection & Server Start
 */

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    logger.success('Database connection established');

    // Initialize Socket.io
    initSocket(httpServer);
    logger.success('Socket.io initialized');

    // Start server
    httpServer.listen(PORT, () => {
      logger.success(`Server running on http://localhost:${PORT}`);
      logger.info('🚀 PropEase API Server is ready');
      logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Promise Rejection:', error.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error.message);
  process.exit(1);
});

startServer();

export default app;
