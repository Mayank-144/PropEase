import { apiClient } from './api';
import { getStoredProps } from '../utils/storage';

/**
 * Property API service
 * Handles all property-related API calls
 */

export const propertyService = {
  /**
   * Get all properties with pagination
   */
  async getAllProperties(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(`/api/properties?page=${page}&limit=${limit}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to fetch properties');
    } catch (error) {
      console.error('Get properties error:', error);
      // Fallback to mock data
      return { properties: getStoredProps(), pagination: { page, limit, total: 0 } };
    }
  },

  /**
   * Get property by ID
   */
  async getPropertyById(id) {
    try {
      const response = await apiClient.get(`/api/properties/${id}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Property not found');
    } catch (error) {
      console.error('Get property error:', error);
      // Fallback to mock data
      const properties = getStoredProps();
      return properties.find(p => p.id === parseInt(id));
    }
  },

  /**
   * Search properties with filters
   */
  async searchProperties(filters) {
    try {
      const params = new URLSearchParams();
      
      if (filters.location) params.append('city', filters.location);
      if (filters.type) params.append('type', filters.type);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      if (filters.featured) params.append('featured', filters.featured);

      const response = await apiClient.get(`/api/properties?${params.toString()}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Search failed');
    } catch (error) {
      console.error('Search properties error:', error);
      // Fallback to mock filtering
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
    }
  },

  /**
   * Get featured properties
   */
  async getFeaturedProperties() {
    try {
      const response = await apiClient.get('/api/properties/featured');
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to fetch featured properties');
    } catch (error) {
      console.error('Get featured properties error:', error);
      return [];
    }
  },

  /**
   * Create new property (Admin)
   */
  async createProperty(propertyData) {
    try {
      const response = await apiClient.post('/api/properties', propertyData);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to create property');
    } catch (error) {
      console.error('Create property error:', error);
      throw error;
    }
  },

  /**
   * Update property (Admin)
   */
  async updateProperty(id, propertyData) {
    try {
      const response = await apiClient.put(`/api/properties/${id}`, propertyData);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to update property');
    } catch (error) {
      console.error('Update property error:', error);
      throw error;
    }
  },

  /**
   * Delete property (Admin)
   */
  async deleteProperty(id) {
    try {
      const response = await apiClient.delete(`/api/properties/${id}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to delete property');
    } catch (error) {
      console.error('Delete property error:', error);
      throw error;
    }
  },

  /**
   * Get property reviews
   */
  async getPropertyReviews(id) {
    try {
      const response = await apiClient.get(`/api/properties/${id}/reviews`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to fetch reviews');
    } catch (error) {
      console.error('Get reviews error:', error);
      return [];
    }
  },

  /**
   * Add property review
   */
  async addPropertyReview(id, reviewData) {
    try {
      const response = await apiClient.post(`/api/properties/${id}/reviews`, reviewData);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to add review');
    } catch (error) {
      console.error('Add review error:', error);
      throw error;
    }
  }
};
