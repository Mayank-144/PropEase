import { HTTP_STATUS } from '../config/constants.js';

/**
 * Global Error Handler Middleware
 */

export const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);

  let statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = error.message || 'Internal Server Error';

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    const messages = Object.values(error.errors).map(e => e.message);
    message = messages.join(', ');
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(error.keyPattern)[0];
    message = `${field} already exists`;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token has expired';
  }

  // Cast error (invalid MongoDB ID)
  if (error.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid ID format';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

/**
 * Async Error Handler Wrapper
 * Wraps async route handlers to catch errors
 */

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 404 Not Found Middleware
 */

export const notFound = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};
