/**
 * Application Constants
 */

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

export const PROPERTY_TYPES = {
  FOR_SALE: 'For Sale',
  FOR_RENT: 'For Rent'
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const BOOKING_PURPOSE = {
  VIEWING: 'viewing',
  PURCHASE_INQUIRY: 'purchase_inquiry',
  RENTAL_INQUIRY: 'rental_inquiry'
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User with that email already exists',
  PROPERTY_NOT_FOUND: 'Property not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  INVALID_INPUT: 'Invalid input data',
  INTERNAL_ERROR: 'Internal server error',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_TOKEN: 'Invalid token'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  PROPERTY_CREATED: 'Property created successfully',
  PROPERTY_UPDATED: 'Property updated successfully',
  PROPERTY_DELETED: 'Property deleted successfully'
};
