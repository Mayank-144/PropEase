import jwt from 'jsonwebtoken';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';

/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user info to request
 */

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.TOKEN_EXPIRED
      });
    }
    
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.INVALID_TOKEN
    });
  }
};

/**
 * Authorization Middleware
 * Checks if user has required role
 */

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED
      });
    }

    next();
  };
};

/**
 * Generate JWT Token
 */
export const generateToken = (userId, role, expiresIn = process.env.JWT_EXPIRE) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
  );
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
