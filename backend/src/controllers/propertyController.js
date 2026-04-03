import Property from '../models/Property.js';
import { validatePropertyInput } from '../middleware/validation.js';
import { formatResponse, buildPropertyFilter, calculatePagination, getPropertySummary } from '../utils/helpers.js';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../config/constants.js';

/**
 * Property Controller
 */

export const propertyController = {
  /**
   * Get all properties with pagination and filters
   */
  async getAllProperties(req, res, next) {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;

      const filter = buildPropertyFilter(filters);
      const total = await Property.countDocuments(filter);
      const pagination = calculatePagination(page, limit, total);

      const properties = await Property.find(filter)
        .populate('owner.userId', 'firstName lastName email phone')
        .limit(pagination.limit)
        .skip(pagination.skip)
        .sort({ createdAt: -1 });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Properties retrieved successfully', {
          properties,
          pagination
        })
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get property by ID
   */
  async getPropertyById(req, res, next) {
    try {
      const { id } = req.params;

      const property = await Property.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      ).populate('owner.userId', 'firstName lastName email phone');

      if (!property) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, ERROR_MESSAGES.PROPERTY_NOT_FOUND)
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Property retrieved successfully', property)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create property (Admin)
   */
  async createProperty(req, res, next) {
    try {
      const { isValid, errors } = validatePropertyInput(req.body);
      if (!isValid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(
          formatResponse(false, 'Validation failed', errors)
        );
      }

      const property = await Property.create({
        ...req.body,
        owner: {
          userId: req.user.userId,
          name: req.body.ownerName || 'Unknown',
          phone: req.body.ownerPhone || '',
          email: req.body.ownerEmail || ''
        }
      });

      return res.status(HTTP_STATUS.CREATED).json(
        formatResponse(true, SUCCESS_MESSAGES.PROPERTY_CREATED, property)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update property (Admin)
   */
  async updateProperty(req, res, next) {
    try {
      const { id } = req.params;

      // Check if property exists
      const property = await Property.findById(id);
      if (!property) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, ERROR_MESSAGES.PROPERTY_NOT_FOUND)
        );
      }

      // Validate update data
      const { isValid, errors } = validatePropertyInput({ ...property.toObject(), ...req.body });
      if (!isValid) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(
          formatResponse(false, 'Validation failed', errors)
        );
      }

      const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, SUCCESS_MESSAGES.PROPERTY_UPDATED, updatedProperty)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete property (Admin)
   */
  async deleteProperty(req, res, next) {
    try {
      const { id } = req.params;

      const property = await Property.findByIdAndDelete(id);
      if (!property) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, ERROR_MESSAGES.PROPERTY_NOT_FOUND)
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, SUCCESS_MESSAGES.PROPERTY_DELETED)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Search properties
   */
  async searchProperties(req, res, next) {
    try {
      const { query, page = 1, limit = 10 } = req.query;

      const searchFilter = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { 'address.city': { $regex: query, $options: 'i' } }
        ]
      };

      const total = await Property.countDocuments(searchFilter);
      const pagination = calculatePagination(page, limit, total);

      const properties = await Property.find(searchFilter)
        .limit(pagination.limit)
        .skip(pagination.skip)
        .sort({ createdAt: -1 });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Search results retrieved', {
          properties,
          pagination
        })
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get featured properties
   */
  async getFeaturedProperties(req, res, next) {
    try {
      const properties = await Property.find({ featured: true, available: true })
        .limit(10)
        .sort({ createdAt: -1 });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Featured properties retrieved', properties)
      );
    } catch (error) {
      next(error);
    }
  }
};
