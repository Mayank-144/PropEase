# PropEase Database Schema Documentation

## 📊 Database Overview

**Database**: MongoDB  
**Type**: NoSQL (Document-based)  
**Collections**: 5 (Users, Properties, Services, Bookings, Favorites)

---

## 📋 Collections

### 1. **Users Collection**

Stores user account information and authentication data.

```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated ID
  firstName: String,                 // Required, max 50 chars
  lastName: String,                  // Required, max 50 chars
  email: String,                     // Required, unique, validated
  password: String,                  // Required, hashed with bcryptjs
  phone: String,                     // Optional, 10 digits
  role: String,                      // Enum: 'user' or 'admin', default: 'user'
  profileImage: String,              // Optional, URL or path
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,                 // Format: 6 digits
    country: String                  // Default: 'India'
  },
  isVerified: Boolean,               // Default: false
  verificationToken: String,         // For email verification
  passwordResetToken: String,        // For password reset
  passwordResetExpires: Date,        // Token expiry time
  createdAt: Date,                   // Auto-generated, default: now
  updatedAt: Date                    // Auto-updated on changes
}
```

**Indexes**:
- `email` (unique)
- `role` (for filtering admin users)

**Methods**:
- `comparePassword(enteredPassword)` → Boolean
- `getProfile()` → User object without sensitive fields

---

### 2. **Properties Collection**

Stores real estate property listings with detailed information.

```javascript
{
  _id: ObjectId,
  title: String,                     // Required, e.g., "New Apartment Nice View"
  description: String,               // Required, detailed description
  price: Number,                     // Required, in rupees
  type: String,                      // Enum: 'For Sale' or 'For Rent'
  location: String,                  // Required, e.g., "Vijay Nagar, Indore"
  address: {
    street: String,
    city: String,                    // Required
    state: String,
    pincode: String,
    country: String,                 // Default: 'India'
    coordinates: {
      latitude: Number,              // For map integration
      longitude: Number
    }
  },
  bedrooms: Number,                  // Required, min: 1
  bathrooms: Number,                 // Required, min: 1
  squareFt: Number,                  // Required, in square feet
  amenities: [String],               // Array of amenities
                                     // E.g., ['Parking', 'Pool', 'Security']
  images: [
    {
      url: String,                   // Image URL
      publicId: String               // For cloud storage reference
    }
  ],
  owner: {
    userId: ObjectId,                // Reference to User._id
    name: String,                    // Owner name
    phone: String,                   // Owner contact
    email: String                    // Owner email
  },
  available: Boolean,                // Default: true
  featured: Boolean,                 // Homepage showcase, default: false
  views: Number,                     // View count, default: 0 (incremented on each view)
  ratings: [
    {
      userId: ObjectId,              // Reference to User who rated
      rating: Number,                // 1-5 scale
      review: String,                // Review text
      date: Date                     // Review date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ city: 1, type: 1 }` (for filtering by city and type)
- `{ 'owner.userId': 1 }` (for owner's properties)
- `{ price: 1 }` (for sorting by price)
- `{ featured: 1 }` (for featured properties)

**Methods**:
- `getAverageRating()` → Number (0-5)

---

### 3. **Services Collection**

Stores service offerings available on the platform.

```javascript
{
  _id: ObjectId,
  title: String,                     // Required, unique
                                     // E.g., "Buy a Home", "Rent a Home"
  icon: String,                      // Emoji or icon identifier
  short: String,                     // Short description (one-liner)
  full: String,                      // Detailed description
  features: [String],                // Array of service features
                                     // E.g., ['1M+ Properties', 'Expert Agents']
  process: [String],                 // Step-by-step process
                                     // E.g., ['Browse listings', 'Schedule visit']
  isActive: Boolean,                 // Display on site, default: true
  order: Number,                     // Display order, default: 0
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `title` (unique)
- `isActive` (for filtering active services)

---

### 4. **Bookings Collection**

Stores property viewing bookings and inquiries.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                  // Reference to User, required
  propertyId: ObjectId,              // Reference to Property, required
  visitDate: Date,                   // Required, must be future date
  visitTime: String,                 // Required, e.g., "10:00 AM"
  purpose: String,                   // Enum: 'viewing', 'purchase_inquiry', 'rental_inquiry'
  notes: String,                     // Optional, additional notes
  status: String,                    // Enum: 'pending', 'confirmed', 'completed', 'cancelled'
                                     // Default: 'pending'
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `{ userId: 1 }` (user's bookings)
- `{ propertyId: 1 }` (property's bookings)
- `{ status: 1 }` (filter by status)

---

### 5. **Favorites Collection**

Stores user's saved/bookmarked properties.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                  // Reference to User, required
  propertyId: ObjectId,              // Reference to Property, required
  createdAt: Date                    // When added to favorites
}
```

**Indexes**:
- `{ userId: 1, propertyId: 1 }` (unique combination)
- Prevents duplicate favorites for the same user-property pair

---

## 🔗 Relationships (References)

```
User (1) ────────────────► (Many) Property
  │                             │
  │                             ├─────────────► Booking
  │                             │
  │                             └─────────────► Favorite
  │
  └──────────────────────────────► Service (Many)
  
Booking references both User and Property
Favorite references both User and Property
```

---

## 📊 Sample Data

### Sample User
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "$2a$10$...", // hashed
  "phone": "9876543210",
  "role": "user",
  "address": {
    "street": "123 Main St",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "pincode": "452001",
    "country": "India"
  },
  "isVerified": true,
  "createdAt": ISODate("2024-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00.000Z")
}
```

### Sample Property
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "New Apartment Nice View",
  "description": "Beautiful 3BHK apartment with modern amenities...",
  "price": 50000,
  "type": "For Rent",
  "location": "Vijay Nagar, Indore",
  "address": {
    "street": "45 Vijay Nagar Road",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "pincode": "452010",
    "country": "India",
    "coordinates": {
      "latitude": 22.7196,
      "longitude": 75.8577
    }
  },
  "bedrooms": 3,
  "bathrooms": 2,
  "squareFt": 2000,
  "amenities": ["Parking", "Elevator", "Security", "Water Supply", "Power Backup"],
  "images": [
    {"url": "https://images.unsplash.com/...", "publicId": "propease/prop1"}
  ],
  "owner": {
    "userId": ObjectId("507f1f77bcf86cd799439011"),
    "name": "Aditya Sharma",
    "phone": "9876543210",
    "email": "aditya@example.com"
  },
  "featured": true,
  "available": true,
  "views": 245,
  "ratings": [
    {
      "userId": ObjectId("507f1f77bcf86cd799439013"),
      "rating": 5,
      "review": "Great property!",
      "date": ISODate("2024-01-20T14:30:00.000Z")
    }
  ],
  "createdAt": ISODate("2024-01-10T08:00:00.000Z"),
  "updatedAt": ISODate("2024-01-20T14:30:00.000Z")
}
```

### Sample Service
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "title": "Buy a Home",
  "icon": "🏠",
  "short": "Over 1 million+ homes for sale",
  "full": "Ready to purchase your dream home?...",
  "features": ["1 Million+ Properties", "Expert Agents", "Property Inspection"],
  "process": ["Browse listings", "Schedule visit", "Get inspection", "Apply loan"],
  "isActive": true,
  "order": 1,
  "createdAt": ISODate("2024-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00.000Z")
}
```

### Sample Booking
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439015"),
  "userId": ObjectId("507f1f77bcf86cd799439013"),
  "propertyId": ObjectId("507f1f77bcf86cd799439012"),
  "visitDate": ISODate("2024-02-15T00:00:00.000Z"),
  "visitTime": "10:00 AM",
  "purpose": "viewing",
  "notes": "Please call before 9 AM",
  "status": "confirmed",
  "createdAt": ISODate("2024-02-01T15:30:00.000Z"),
  "updatedAt": ISODate("2024-02-01T15:30:00.000Z")
}
```

### Sample Favorite
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439016"),
  "userId": ObjectId("507f1f77bcf86cd799439013"),
  "propertyId": ObjectId("507f1f77bcf86cd799439012"),
  "createdAt": ISODate("2024-02-01T16:00:00.000Z")
}
```

---

## 🔍 Common Queries

### Find all properties in a city
```javascript
db.properties.find({ "address.city": "Indore" })
```

### Find featured properties for sale
```javascript
db.properties.find({ featured: true, type: "For Sale" })
```

### Get user's bookings with property details
```javascript
db.bookings.aggregate([
  { $match: { userId: ObjectId("...") } },
  { $lookup: { from: "properties", localField: "propertyId", foreignField: "_id", as: "property" } }
])
```

### Find user's favorite properties
```javascript
db.favorites.aggregate([
  { $match: { userId: ObjectId("...") } },
  { $lookup: { from: "properties", localField: "propertyId", foreignField: "_id", as: "property" } }
])
```

### Get top-rated properties
```javascript
db.properties.aggregate([
  { $project: { title: 1, avgRating: { $avg: "$ratings.rating" } } },
  { $sort: { avgRating: -1 } },
  { $limit: 10 }
])
```

---

## 🛡️ Data Validation Rules

### User
- `firstName`, `lastName`: Non-empty strings, max 50 characters
- `email`: Valid email format, unique
- `password`: Min 6 characters, hashed before storage
- `phone`: 10-digit format (Indian)
- `pincode`: 6-digit format
- `role`: Only 'user' or 'admin'

### Property
- `title`, `description`: Required, non-empty
- `price`: Positive number
- `type`: Only 'For Sale' or 'For Rent'
- `bedrooms`, `bathrooms`: Positive integers, min 1
- `squareFt`: Positive number
- `coordinates`: Valid latitude (-90 to 90), longitude (-180 to 180)
- `rating`: 1-5 scale

### Booking
- `visitDate`: Must be in the future
- `visitTime`: Valid time format
- `purpose`: Only valid enum values
- `status`: Only valid enum values

---

## 📈 Performance Optimization

### Indexes
All important fields are indexed for faster queries:
- User email (unique)
- Property city, type, price, owner
- Booking userId, propertyId, status
- Favorite userId-propertyId combination

### Query Optimization Tips
1. Use projection to get only needed fields
2. Limit result sets with pagination
3. Use aggregation pipeline for complex queries
4. Cache frequently accessed data
5. Add compound indexes for multi-field queries

---

## 🔐 Data Security

1. **Passwords**: Hashed with bcryptjs (salt rounds: 10)
2. **Tokens**: JWT signed with secret key
3. **Sensitive Fields**: Password not returned in API responses
4. **Validation**: Input validation on all fields
5. **Authorization**: Role-based access control

---

## 📦 Backup & Recovery

```bash
# Backup
mongodump --db propease --out ./backup

# Restore
mongorestore --db propease ./backup/propease
```

---

## 🔄 Data Migration Guide

### Add New Field to Properties
```javascript
db.properties.updateMany({}, { $set: { newField: defaultValue } })
```

### Rename Collection
```javascript
db.properties.renameCollection("properties_v2")
```

### Delete Collection
```javascript
db.properties.drop()
```

---

**Last Updated**: April 4, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
