import { apiClient } from './api';
import { getStoredProps } from '../utils/storage';

/**
 * Property API service
 */

export const propertyService = {
  /**
   * Get all properties
   */
  async getAllProperties() {
    // TODO: Replace with actual API call when backend is ready
    // return apiClient.get('/api/properties');
    return getStoredProps();
  },

  /**
   * Get property by ID
   */
  async getPropertyById(id) {
    // return apiClient.get(`/api/properties/${id}`);
    const properties = getStoredProps();
    return properties.find(p => p.id === parseInt(id));
  },

  /**
   * Search properties with filters
   */
  async searchProperties(filters) {
    // const params = new URLSearchParams(filters);
    // return apiClient.get(`/api/properties/search?${params}`);

    const properties = getStoredProps();
    return properties.filter(p => {
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.type && p.type !== filters.type) {
        return false;
      }
      if (filters.minPrice && p.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && p.price > filters.maxPrice) {
        return false;
      }
      if (filters.bedrooms && p.bedrooms >= filters.bedrooms) {
        return true;
      }
      return true;
    });
  },

  /**
   * Create new property (Admin)
   */
  async createProperty(propertyData) {
    // return apiClient.post('/api/properties', propertyData);
    throw new Error('Property creation not yet implemented');
  },

  /**
   * Update property (Admin)
   */
  async updateProperty(id, propertyData) {
    // return apiClient.put(`/api/properties/${id}`, propertyData);
    throw new Error('Property update not yet implemented');
  },

  /**
   * Delete property (Admin)
   */
  async deleteProperty(id) {
    // return apiClient.delete(`/api/properties/${id}`);
    throw new Error('Property deletion not yet implemented');
  },

  /**
   * Get property reviews
   */
  async getPropertyReviews(id) {
    // return apiClient.get(`/api/properties/${id}/reviews`);
    const property = await this.getPropertyById(id);
    return property?.ratings || [];
  },

  /**
   * Add property review
   */
  async addPropertyReview(id, reviewData) {
    // return apiClient.post(`/api/properties/${id}/reviews`, reviewData);
    throw new Error('Review posting not yet implemented');
  }
};
