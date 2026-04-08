import express from 'express';
import { serviceController } from '../controllers/serviceController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * Service Routes
 */

// Public routes
router.get('/', asyncHandler(serviceController.getAllServices));
router.get('/:id', asyncHandler(serviceController.getServiceById));

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(serviceController.createService)
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(serviceController.updateService)
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(serviceController.deleteService)
);

export default router;
