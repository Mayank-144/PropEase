import mongoose from 'mongoose';

/**
 * Service Schema
 * Represents services offered by the platform (Buy, Rent, Sell, Management, etc.)
 */

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    unique: true,
    trim: true
  },
  icon: String,
  short: {
    type: String,
    required: [true, 'Short description is required']
  },
  full: {
    type: String,
    required: [true, 'Full description is required']
  },
  features: [String],
  process: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
