import { apiClient } from './api';

/**
 * Booking API service
 * Handles all booking-related API calls
 */

export const bookingService = {
  /**
   * Create new booking
   */
  async createBooking(bookingData) {
    try {
      const response = await apiClient.post('/api/bookings', bookingData);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to create booking');
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  },

  /**
   * Get user's bookings
   */
  async getUserBookings(page = 1, limit = 10) {
    try {
      const response = await apiClient.get(`/api/bookings?page=${page}&limit=${limit}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to fetch bookings');
    } catch (error) {
      console.error('Get bookings error:', error);
      throw error;
    }
  },

  /**
   * Get booking by ID
   */
  async getBookingById(id) {
    try {
      const response = await apiClient.get(`/api/bookings/${id}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Booking not found');
    } catch (error) {
      console.error('Get booking error:', error);
      throw error;
    }
  },

  /**
   * Cancel booking
   */
  async cancelBooking(id) {
    try {
      const response = await apiClient.put(`/api/bookings/${id}/cancel`, {});
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to cancel booking');
    } catch (error) {
      console.error('Cancel booking error:', error);
      throw error;
    }
  },

  /**
   * Get property bookings (Admin)
   */
  async getPropertyBookings(propertyId, page = 1, limit = 10) {
    try {
      const response = await apiClient.get(`/api/bookings/property/${propertyId}?page=${page}&limit=${limit}`);
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to fetch property bookings');
    } catch (error) {
      console.error('Get property bookings error:', error);
      throw error;
    }
  },

  /**
   * Update booking status (Admin)
   */
  async updateBookingStatus(id, status) {
    try {
      const response = await apiClient.put(`/api/bookings/${id}/status`, { status });
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to update booking status');
    } catch (error) {
      console.error('Update booking status error:', error);
      throw error;
    }
  }
};
