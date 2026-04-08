import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateToken, generateRefreshToken } from '../middleware/auth.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/validation.js';
import { formatResponse, sanitizeUser } from '../utils/helpers.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';

/**
 * Authentication Controller
 */

export const authController = {
  /**
   * Register new user
   */
  async register(req, res, next) {
    try {
      const { firstName, lastName, email, password, confirmPassword } = req.body;

      // Validate input
      const { isValid, errors } = validateRegisterInput({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });

      if (!isValid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(
          formatResponse(false, 'Validation failed', errors)
        );
      }

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(HTTP_STATUS.CONFLICT).json(
          formatResponse(false, ERROR_MESSAGES.USER_ALREADY_EXISTS)
        );
      }

      // Create user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role: 'user'
      });

      // Generate tokens
      const token = generateToken(user._id.toString(), user.role);
      const refreshToken = generateRefreshToken(user._id.toString(), user.role);

      return res.status(HTTP_STATUS.CREATED).json(
        formatResponse(true, SUCCESS_MESSAGES.LOGIN_SUCCESS, {
          user: sanitizeUser(user),
          token,
          refreshToken
        })
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Login user
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validate input
      const { isValid, errors } = validateLoginInput(email, password);
      if (!isValid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(
          formatResponse(false, 'Validation failed', errors)
        );
      }

      // Find user (include password field)
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(
          formatResponse(false, ERROR_MESSAGES.INVALID_CREDENTIALS)
        );
      }

      // Compare password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(
          formatResponse(false, ERROR_MESSAGES.INVALID_CREDENTIALS)
        );
      }

      // Generate tokens
      const token = generateToken(user._id.toString(), user.role);
      const refreshToken = generateRefreshToken(user._id.toString(), user.role);

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, SUCCESS_MESSAGES.LOGIN_SUCCESS, {
          user: sanitizeUser(user),
          token,
          refreshToken
        })
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Logout user
   */
  async logout(req, res, next) {
    try {
      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, SUCCESS_MESSAGES.LOGOUT_SUCCESS)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser(req, res, next) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, ERROR_MESSAGES.USER_NOT_FOUND)
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'User retrieved successfully', sanitizeUser(user))
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Refresh token
   */
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse(false, 'Refresh token is required')
        );
      }

      // Verify refresh token using ESM import (not require)
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Generate new access token
      const newToken = generateToken(decoded.userId, decoded.role);

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Token refreshed successfully', { token: newToken })
      );
    } catch (error) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(
        formatResponse(false, 'Invalid refresh token')
      );
    }
  }
};
