import mongoose from 'mongoose';

/**
 * Booking Schema
 * Represents property viewings, purchase inquiries, and rental inquiries
 */

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property ID is required']
  },
  visitDate: {
    type: Date,
    required: [true, 'Visit date is required']
  },
  visitTime: {
    type: String,
    required: [true, 'Visit time is required']
  },
  purpose: {
    type: String,
    enum: ['viewing', 'purchase_inquiry', 'rental_inquiry'],
    required: [true, 'Booking purpose is required']
  },
  notes: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
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

// Create indexes
bookingSchema.index({ userId: 1 });
bookingSchema.index({ propertyId: 1 });
bookingSchema.index({ status: 1 });

export default mongoose.model('Booking', bookingSchema);
