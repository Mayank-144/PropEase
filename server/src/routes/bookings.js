import express from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * Booking Routes
 */

// Protected routes (All authenticated users)
router.post(
  '/',
  authenticate,
  asyncHandler(bookingController.createBooking)
);

router.get(
  '/',
  authenticate,
  asyncHandler(bookingController.getUserBookings)
);

router.get(
  '/:id',
  authenticate,
  asyncHandler(bookingController.getBookingById)
);

router.put(
  '/:id/cancel',
  authenticate,
  asyncHandler(bookingController.cancelBooking)
);

// Protected routes (Admin only)
router.get(
  '/property/:propertyId',
  authenticate,
  authorize('admin'),
  asyncHandler(bookingController.getPropertyBookings)
);

router.put(
  '/:id/status',
  authenticate,
  authorize('admin'),
  asyncHandler(bookingController.updateBookingStatus)
);

export default router;
