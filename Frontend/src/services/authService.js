import { apiClient } from './api';

/**
 * Authentication API service
 * Handles user login, registration, and token management
 */

export const authService = {
  /**
   * Login user with email and password
   */
  async login(email, password) {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      
      if (response.success) {
        const { user, token, refreshToken } = response.data;
        localStorage.setItem('hv_user', JSON.stringify(user));
        localStorage.setItem('hv_token', token);
        localStorage.setItem('hv_refreshToken', refreshToken);
        return user;
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/api/auth/register', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      });

      if (response.success) {
        const { user, token, refreshToken } = response.data;
        localStorage.setItem('hv_user', JSON.stringify(user));
        localStorage.setItem('hv_token', token);
        localStorage.setItem('hv_refreshToken', refreshToken);
        return user;
      }

      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      // Call backend logout endpoint
      await apiClient.post('/api/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('hv_user');
      localStorage.removeItem('hv_token');
      localStorage.removeItem('hv_refreshToken');
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/api/auth/me');
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to get user');
    } catch (error) {
      console.error('Get user error:', error);
      // Return cached user if API fails
      const user = localStorage.getItem('hv_user');
      return user ? JSON.parse(user) : null;
    }
  },

  /**
   * Refresh authentication token
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('hv_refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post('/api/auth/refresh-token', { refreshToken });
      
      if (response.success) {
        const { token, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('hv_token', token);
        if (newRefreshToken) {
          localStorage.setItem('hv_refreshToken', newRefreshToken);
        }
        return token;
      }

      throw new Error(response.message || 'Token refresh failed');
    } catch (error) {
      console.error('Token refresh error:', error);
      // Clear tokens on refresh failure
      localStorage.removeItem('hv_token');
      localStorage.removeItem('hv_refreshToken');
      throw error;
    }
  }
};
