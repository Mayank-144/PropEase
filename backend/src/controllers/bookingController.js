import Booking from '../models/Booking.js';
import { validateBookingInput } from '../middleware/validation.js';
import { formatResponse, calculatePagination } from '../utils/helpers.js';
import { HTTP_STATUS } from '../config/constants.js';

/**
 * Booking Controller
 */

export const bookingController = {
  /**
   * Create booking
   */
  async createBooking(req, res, next) {
    try {
      const { propertyId, visitDate, visitTime, purpose, notes } = req.body;

      // Validate input
      const { isValid, errors } = validateBookingInput({ visitDate, visitTime, purpose });
      if (!isValid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(
          formatResponse(false, 'Validation failed', errors)
        );
      }

      const booking = await Booking.create({
        userId: req.user.userId,
        propertyId,
        visitDate,
        visitTime,
        purpose,
        notes: notes || ''
      });

      return res.status(HTTP_STATUS.CREATED).json(
        formatResponse(true, 'Booking created successfully', booking)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get user's bookings
   */
  async getUserBookings(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const total = await Booking.countDocuments({ userId: req.user.userId });
      const pagination = calculatePagination(page, limit, total);

      const bookings = await Booking.find({ userId: req.user.userId })
        .populate('propertyId', 'title price location')
        .limit(pagination.limit)
        .skip(pagination.skip)
        .sort({ createdAt: -1 });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Bookings retrieved successfully', { bookings, pagination })
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get booking by ID
   */
  async getBookingById(req, res, next) {
    try {
      const { id } = req.params;

      const booking = await Booking.findById(id)
        .populate('propertyId')
        .populate('userId', 'firstName lastName email phone');

      if (!booking) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, 'Booking not found')
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Booking retrieved successfully', booking)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update booking status
   */
  async updateBookingStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse(false, 'Invalid status')
        );
      }

      const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
      if (!booking) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, 'Booking not found')
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Booking updated successfully', booking)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get property bookings (Admin)
   */
  async getPropertyBookings(req, res, next) {
    try {
      const { propertyId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const total = await Booking.countDocuments({ propertyId });
      const pagination = calculatePagination(page, limit, total);

      const bookings = await Booking.find({ propertyId })
        .populate('userId', 'firstName lastName email phone')
        .limit(pagination.limit)
        .skip(pagination.skip)
        .sort({ visitDate: 1 });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Property bookings retrieved', { bookings, pagination })
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Cancel booking
   */
  async cancelBooking(req, res, next) {
    try {
      const { id } = req.params;

      const booking = await Booking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
      if (!booking) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, 'Booking not found')
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Booking cancelled successfully', booking)
      );
    } catch (error) {
      next(error);
    }
  }
};
