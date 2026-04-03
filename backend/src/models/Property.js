import mongoose from 'mongoose';

/**
 * Property Schema
 * Represents real estate properties (houses, apartments, villas, etc.)
 */

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Property description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  type: {
    type: String,
    enum: ['For Sale', 'For Rent'],
    required: [true, 'Property type is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  address: {
    street: String,
    city: {
      type: String,
      required: true
    },
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 1
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 1
  },
  squareFt: {
    type: Number,
    required: true
  },
  amenities: [String],
  images: [
    {
      url: String,
      publicId: String // For Cloudinary/AWS
    }
  ],
  owner: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    phone: String,
    email: String
  },
  available: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      review: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create indexes for better query performance
propertySchema.index({ city: 1, type: 1 });
propertySchema.index({ 'owner.userId': 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ featured: 1 });

// Calculate average rating
propertySchema.methods.getAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
};

export default mongoose.model('Property', propertySchema);
