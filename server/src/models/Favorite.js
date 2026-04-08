import mongoose from 'mongoose';

/**
 * Favorite Schema
 * Represents user's favorite/saved properties
 */

const favoriteSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: false });

// Ensure unique combination of userId and propertyId
favoriteSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
