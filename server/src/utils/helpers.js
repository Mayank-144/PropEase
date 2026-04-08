/**
 * Helper Functions & Utilities
 */

/**
 * Format response object
 */
export const formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    ...(data && { data })
  };
};

/**
 * Sanitize user object (remove sensitive data)
 */
export const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  const { password, passwordResetToken, passwordResetExpires, ...sanitized } = userObj;
  return sanitized;
};

/**
 * Generate property summary
 */
export const getPropertySummary = (property) => {
  return {
    id: property._id,
    title: property.title,
    price: property.price,
    location: property.location,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    type: property.type,
    imageUrl: property.images?.[0]?.url || null,
    featured: property.featured
  };
};

/**
 * Calculate pagination info
 */
export const calculatePagination = (page, limit, total) => {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const itemsPerPage = Math.min(parseInt(limit) || 10, 100);
  const totalPages = Math.ceil(total / itemsPerPage);
  const skip = (currentPage - 1) * itemsPerPage;

  return {
    page: currentPage,
    limit: itemsPerPage,
    total,
    totalPages,
    skip,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

/**
 * Format property filter query
 */
export const buildPropertyFilter = (query) => {
  const filter = {};

  if (query.type) filter.type = query.type;
  if (query.city) filter['address.city'] = { $regex: query.city, $options: 'i' };
  if (query.minPrice) filter.price = { $gte: parseInt(query.minPrice) };
  if (query.maxPrice) {
    filter.price = filter.price || {};
    filter.price.$lte = parseInt(query.maxPrice);
  }
  if (query.bedrooms) filter.bedrooms = { $gte: parseInt(query.bedrooms) };
  if (query.featured) filter.featured = query.featured === 'true';
  if (query.available === 'true') filter.available = true;

  return filter;
};

/**
 * Email validation helper
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate random string (for tokens, codes, etc.)
 */
export const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Format date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
