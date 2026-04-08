import express from 'express';
import { propertyController } from '../controllers/propertyController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * Property Routes
 */

// Public routes
router.get('/', asyncHandler(propertyController.getAllProperties));
router.get('/featured', asyncHandler(propertyController.getFeaturedProperties));
router.get('/search', asyncHandler(propertyController.searchProperties));
router.get('/:id', asyncHandler(propertyController.getPropertyById));

// Protected routes (Admin only)
router.post(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(propertyController.createProperty)
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(propertyController.updateProperty)
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(propertyController.deleteProperty)
);

export default router;
