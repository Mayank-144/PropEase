import validator from 'validator';

/**
 * Input Validation Middleware & Utilities
 */

/**
 * Validate email
 */
export const validateEmail = (email) => {
  return validator.isEmail(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  return password.length >= 6;
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
};

/**
 * Validate pincode
 */
export const validatePincode = (pincode) => {
  return /^[0-9]{6}$/.test(pincode);
};

/**
 * Validate property price
 */
export const validatePrice = (price) => {
  return !isNaN(price) && price > 0;
};

/**
 * Validate bedrooms
 */
export const validateBedrooms = (bedrooms) => {
  return Number.isInteger(bedrooms) && bedrooms >= 1;
};

/**
 * Validate bathrooms
 */
export const validateBathrooms = (bathrooms) => {
  return Number.isInteger(bathrooms) && bathrooms >= 1;
};

/**
 * Validate square footage
 */
export const validateSquareFt = (squareFt) => {
  return !isNaN(squareFt) && squareFt > 0;
};

/**
 * Login validation
 */
export const validateLoginInput = (email, password) => {
  const errors = {};

  if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Register validation
 */
export const validateRegisterInput = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Property validation
 */
export const validatePropertyInput = (data) => {
  const errors = {};

  if (!data.title?.trim()) {
    errors.title = 'Property title is required';
  }

  if (!data.description?.trim()) {
    errors.description = 'Property description is required';
  }

  if (!validatePrice(data.price)) {
    errors.price = 'Invalid price';
  }

  if (!['For Sale', 'For Rent'].includes(data.type)) {
    errors.type = 'Invalid property type';
  }

  if (!data.location?.trim()) {
    errors.location = 'Location is required';
  }

  if (!validateBedrooms(data.bedrooms)) {
    errors.bedrooms = 'Invalid number of bedrooms';
  }

  if (!validateBathrooms(data.bathrooms)) {
    errors.bathrooms = 'Invalid number of bathrooms';
  }

  if (!validateSquareFt(data.squareFt)) {
    errors.squareFt = 'Invalid square footage';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Booking validation
 */
export const validateBookingInput = (data) => {
  const errors = {};

  if (!data.visitDate) {
    errors.visitDate = 'Visit date is required';
  } else if (new Date(data.visitDate) < new Date()) {
    errors.visitDate = 'Visit date must be in the future';
  }

  if (!data.visitTime?.trim()) {
    errors.visitTime = 'Visit time is required';
  }

  const validPurposes = ['viewing', 'purchase_inquiry', 'rental_inquiry'];
  if (!validPurposes.includes(data.purpose)) {
    errors.purpose = 'Invalid booking purpose';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
