import Service from '../models/Service.js';
import { formatResponse } from '../utils/helpers.js';
import { HTTP_STATUS } from '../config/constants.js';

/**
 * Service Controller
 */

export const serviceController = {
  /**
   * Get all services
   */
  async getAllServices(req, res, next) {
    try {
      const services = await Service.find({ isActive: true }).sort({ order: 1 });

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Services retrieved successfully', services)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get service by ID
   */
  async getServiceById(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findById(id);
      if (!service) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, 'Service not found')
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Service retrieved successfully', service)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create service (Admin)
   */
  async createService(req, res, next) {
    try {
      const { title, icon, short, full, features, process } = req.body;

      if (!title || !short || !full) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(
          formatResponse(false, 'Required fields missing')
        );
      }

      const service = await Service.create({
        title,
        icon,
        short,
        full,
        features: features || [],
        process: process || []
      });

      return res.status(HTTP_STATUS.CREATED).json(
        formatResponse(true, 'Service created successfully', service)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update service (Admin)
   */
  async updateService(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
      if (!service) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, 'Service not found')
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Service updated successfully', service)
      );
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete service (Admin)
   */
  async deleteService(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(
          formatResponse(false, 'Service not found')
        );
      }

      return res.status(HTTP_STATUS.OK).json(
        formatResponse(true, 'Service deleted successfully')
      );
    } catch (error) {
      next(error);
    }
  }
};
