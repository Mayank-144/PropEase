import { apiClient } from './api';

/**
 * Authentication API service
 */

export const authService = {
  /**
   * Login user with email and password
   */
  async login(email, password) {
    // TODO: Replace with actual API call when backend is ready
    // return apiClient.post('/api/auth/login', { email, password });

    // Mock login for development
    // Dummy users for testing:
    // email: admin@propease.com, password: admin123 (admin)
    // email: user@propease.com, password: user123 (user)

    if (email === 'admin@propease.com' && password === 'admin123') {
      const user = { id: 1, email, name: 'Admin User', role: 'admin' };
      localStorage.setItem('hv_user', JSON.stringify(user));
      localStorage.setItem('hv_token', 'mock_admin_token_' + Date.now());
      return user;
    }

    if (email === 'user@propease.com' && password === 'user123') {
      const user = { id: 2, email, name: 'Regular User', role: 'user' };
      localStorage.setItem('hv_user', JSON.stringify(user));
      localStorage.setItem('hv_token', 'mock_user_token_' + Date.now());
      return user;
    }

    throw new Error('Invalid email or password');
  },

  /**
   * Register new user
   */
  async register(userData) {
    // return apiClient.post('/api/auth/register', userData);
    throw new Error('Registration not yet implemented');
  },

  /**
   * Logout user
   */
  async logout() {
    localStorage.removeItem('hv_user');
    localStorage.removeItem('hv_token');
    // return apiClient.post('/api/auth/logout');
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    // return apiClient.get('/api/auth/me');
    const user = localStorage.getItem('hv_user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Refresh authentication token
   */
  async refreshToken() {
    // return apiClient.post('/api/auth/refresh');
    throw new Error('Token refresh not yet implemented');
  }
};
