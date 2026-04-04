import { apiClient } from './api';

/**
 * Service API service
 * Handles all service-related API calls
 */

export const serviceService = {
  /**
   * Get all services
   */
  async getAllServices() {
    try {
      const response = await apiClient.get('/api/services');
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to fetch services');
    } catch (error) {
      console.error('Get services error:', error);
      return [];
    }
  },

  /**
   * Get service by ID
   */
  async getServiceById(id) {
    try {
      const response = await apiClient.get(`/api/services/${id}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Service not found');
    } catch (error) {
      console.error('Get service error:', error);
      throw error;
    }
  },

  /**
   * Create new service (Admin)
   */
  async createService(serviceData) {
    try {
      const response = await apiClient.post('/api/services', serviceData);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to create service');
    } catch (error) {
      console.error('Create service error:', error);
      throw error;
    }
  },

  /**
   * Update service (Admin)
   */
  async updateService(id, serviceData) {
    try {
      const response = await apiClient.put(`/api/services/${id}`, serviceData);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to update service');
    } catch (error) {
      console.error('Update service error:', error);
      throw error;
    }
  },

  /**
   * Delete service (Admin)
   */
  async deleteService(id) {
    try {
      const response = await apiClient.delete(`/api/services/${id}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to delete service');
    } catch (error) {
      console.error('Delete service error:', error);
      throw error;
    }
  }
};
