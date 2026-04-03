# PropEase - MERN Stack Architecture & Structure

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Directory Structure](#directory-structure)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [Authentication Flow](#authentication-flow)
10. [Setup Instructions](#setup-instructions)

---

## Project Overview

**PropEase** is a full-stack real estate property management and rental platform built with the MERN stack. It allows users to:
- Browse properties for sale/rent
- View detailed property information
- Admin panel to manage properties and services
- User authentication and authorization
- Contact property owners

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Pages: Home, Login, AdminPanel, PropertyDetail, Service  │  │
│  │ Components: Header, Footer, Hero, About, Services        │  │
│  │ Cards: PropertyCard, Amenities, PropertiesSelection      │  │
│  │ State: User, Page, Properties, Services (From Context)   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTP/REST API
                             │ (Axios/Fetch)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              SERVER (Node.js + Express.js)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Routes:                                                   │  │
│  │  - /api/auth (login, register, logout)                   │  │
│  │  - /api/properties (CRUD operations)                     │  │
│  │  - /api/services (CRUD operations)                       │  │
│  │  - /api/users (user profile management)                  │  │
│  │                                                           │  │
│  │ Middleware:                                              │  │
│  │  - Authentication (JWT)                                  │  │
│  │  - Authorization (Role-based)                            │  │
│  │  - Error handling                                        │  │
│  │  - CORS                                                  │  │
│  │                                                           │  │
│  │ Controllers: Auth, Properties, Services, Users           │  │
│  │ Services: Business logic layer                           │  │
│  │ Utils: Validators, Helpers                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬─────────────────────────────────────┘
                             │ Database Query
                             │ (Mongoose/MongoDB Driver)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              DATABASE (MongoDB)                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Collections:                                              │  │
│  │  - users (credentials, profile, role)                    │  │
│  │  - properties (listings, details, amenities)             │  │
│  │  - services (service offerings)                          │  │
│  │  - bookings (property viewings/purchases)                │  │
│  │  - favorites (user saved properties)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19.2.4** | UI Library |
| **Vite 8.0.1** | Build tool & dev server |
| **CSS3** | Styling (no framework) |
| **LocalStorage** | Client-side data persistence |
| **ESLint** | Code quality |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | ODM (Object Data Modeling) |
| **JWT** | Authentication |
| **Bcrypt** | Password hashing |
| **Dotenv** | Environment variables |
| **Cors** | Cross-origin requests |
| **Nodemon** | Development auto-reload |

### Development Tools
| Tool | Purpose |
|------|---------|
| **npm/yarn** | Package management |
| **Postman** | API testing |
| **MongoDB Compass** | Database GUI |

---

## Directory Structure

```
PropEase/
│
├── PROPEASE/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx                   # Main application component
│   │   ├── main.jsx                  # React DOM entry point
│   │   │
│   │   ├── Components/               # Reusable UI Components
│   │   │   ├── About.jsx            # About section
│   │   │   ├── Contact.jsx          # Contact form
│   │   │   ├── Hero.jsx             # Hero/banner section
│   │   │   ├── Service.jsx          # Services display
│   │   │   └── Layout/              # Layout components
│   │   │       ├── Header.jsx       # Navigation header
│   │   │       └── Footer.jsx       # Footer
│   │   │
│   │   ├── Card/                     # Card Components
│   │   │   ├── PropertyCard.jsx     # Individual property card
│   │   │   ├── Amenities.jsx        # Amenities display
│   │   │   └── PropertiesSelection.jsx # Properties grid/list
│   │   │
│   │   ├── pages/                    # Page Components
│   │   │   ├── login.jsx            # Login/Auth page
│   │   │   ├── AdminPanel.jsx       # Admin dashboard
│   │   │   ├── PropertyDetail.jsx   # Property details page
│   │   │   └── ServiceDetail.jsx    # Service details page
│   │   │
│   │   ├── data/                     # Mock data (temporary)
│   │   │   └── mockdata.js          # Properties,Services mock data
│   │   │
│   │   ├── utils/                    # Utility functions
│   │   │   └── storage.js           # LocalStorage operations
│   │   │
│   │   ├── assets/
│   │   │   └── globalStyles.css     # Global styles
│   │   │
│   │   ├── hooks/                    # React Hooks (to be added)
│   │   │   ├── useAuth.js           # Authentication hook
│   │   │   └── useProperties.js     # Properties hook
│   │   │
│   │   └── services/                 # API calls (to be added)
│   │       ├── api.js               # Axios/Fetch configuration
│   │       ├── authService.js       # Auth API calls
│   │       └── propertyService.js   # Property API calls
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── README_USAGE.md
│
├── backend/                           # Backend (Node.js + Express)
│   ├── src/
│   │   ├── server.js                # Express app setup & server start
│   │   │
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   └── constants.js         # App constants
│   │   │
│   │   ├── models/                  # Mongoose Schemas
│   │   │   ├── User.js              # User schema & methods
│   │   │   ├── Property.js          # Property schema
│   │   │   ├── Service.js           # Service schema
│   │   │   ├── Booking.js           # Booking/Viewing schema
│   │   │   └── Favorite.js          # Favorites schema
│   │   │
│   │   ├── controllers/              # Request handlers
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── propertyController.js # Property CRUD
│   │   │   ├── serviceController.js # Service CRUD
│   │   │   ├── userController.js    # User profile
│   │   │   └── bookingController.js # Booking logic
│   │   │
│   │   ├── routes/                   # API routes
│   │   │   ├── auth.js              # Auth endpoints
│   │   │   ├── properties.js        # Property endpoints
│   │   │   ├── services.js          # Service endpoints
│   │   │   ├── users.js             # User endpoints
│   │   │   └── bookings.js          # Booking endpoints
│   │   │
│   │   ├── middleware/               # Custom middleware
│   │   │   ├── auth.js              # JWT verification
│   │   │   ├── errorHandler.js      # Error handling
│   │   │   └── validation.js        # Input validation
│   │   │
│   │   ├── services/                 # Business logic layer
│   │   │   ├── authService.js
│   │   │   ├── propertyService.js
│   │   │   └── userService.js
│   │   │
│   │   └── utils/
│   │       ├── validators.js        # Input validators
│   │       ├── helpers.js           # Helper functions
│   │       ├── jwt.js               # JWT utilities
│   │       └── email.js             # Email sending
│   │
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Example env file
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js                    # Entry point
│
├── MERN_ARCHITECTURE.md             # This file
└── .gitignore

```

---

## Frontend Architecture

### Component Hierarchy

```
App (Root)
├── Header (Navigation)
├── Login / Main Layout
│   ├── Hero (Banner)
│   ├── About (Info section)
│   ├── Services (Services showcase)
│   ├── PropertiesSelection (Properties grid)
│   │   └── PropertyCard (Individual properties)
│   ├── Amenities (Feature display)
│   ├── Contact (Contact form)
│   └── Footer
├── Admin Panel (If user.role === "admin")
└── Detail Pages
    ├── PropertyDetail
    └── ServiceDetail
```

### State Management (Current)
- **User State**: Authentication user data
- **Page State**: Current page/view
- **Selected Property**: Currently viewed property
- **Selected Service**: Currently viewed service

### Future Improvements
- Migrate to **Context API** or **Redux** for global state
- Add **React Router** for page navigation
- Implement **API integration** with backend

---

## Backend Architecture

### Layered Architecture

```
HTTP Request
    ↓
Routes (Routing layer)
    ↓
Middleware (Auth, Validation)
    ↓
Controllers (Request handlers)
    ↓
Services (Business logic)
    ↓
Models (Database layer)
    ↓
MongoDB
```

### Error Handling Flow

```
Error Occurs
    ↓
Caught in Controller/Service
    ↓
Error Handler Middleware
    ↓
Formatted Error Response
    ↓
Client
```

---

## Database Schema

### Collections & Fields

#### **Users Collection**
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  firstName: String,
  lastName: String,
  phone: String,
  role: String (enum: ["user", "admin"], default: "user"),
  profileImage: String (URL),
  address: {
    street: String,
    city: String,
    pincode: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### **Properties Collection**
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  price: Number (required),
  type: String (enum: ["For Sale", "For Rent"], required),
  location: String (required),
  address: {
    street: String,
    city: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  bedrooms: Number,
  bathrooms: Number,
  squareFt: Number,
  amenities: [String],
  images: [String] (URLs),
  owner: {
    userId: ObjectId (ref: User),
    name: String,
    phone: String,
    email: String
  },
  available: Boolean,
  featured: Boolean (for homepage showcase),
  views: Number (analytics),
  ratings: [{
    userId: ObjectId,
    rating: Number,
    review: String,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### **Services Collection**
```javascript
{
  _id: ObjectId,
  title: String (required),
  icon: String,
  short: String (short description),
  full: String (detailed description),
  features: [String],
  process: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### **Bookings Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  propertyId: ObjectId (ref: Property),
  visitDate: Date,
  visitTime: String,
  purpose: String (enum: ["viewing", "purchase_inquiry", "rental_inquiry"]),
  notes: String,
  status: String (enum: ["pending", "confirmed", "completed", "cancelled"]),
  createdAt: Date,
  updatedAt: Date
}
```

#### **Favorites Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  propertyId: ObjectId (ref: Property),
  createdAt: Date
}
```

---

## API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - User login
POST   /api/auth/logout         - User logout
POST   /api/auth/refresh        - Refresh JWT token
POST   /api/auth/forgot-password - Forgot password
POST   /api/auth/reset-password  - Reset password
```

### Property Endpoints
```
GET    /api/properties          - Get all properties
GET    /api/properties/:id      - Get property details
POST   /api/properties          - Create property (Admin)
PUT    /api/properties/:id      - Update property (Admin)
DELETE /api/properties/:id      - Delete property (Admin)
GET    /api/properties/search?location=&type=&price=  - Search properties
GET    /api/properties/:id/reviews - Get property reviews
POST   /api/properties/:id/reviews - Add review
```

### Service Endpoints
```
GET    /api/services           - Get all services
GET    /api/services/:id       - Get service details
POST   /api/services           - Create service (Admin)
PUT    /api/services/:id       - Update service (Admin)
DELETE /api/services/:id       - Delete service (Admin)
```

### User Endpoints
```
GET    /api/users/profile      - Get user profile
PUT    /api/users/profile      - Update user profile
GET    /api/users/:id          - Get user details
GET    /api/users/:id/properties - Get user's properties
```

### Booking Endpoints
```
POST   /api/bookings           - Create booking
GET    /api/bookings           - Get user's bookings
GET    /api/bookings/:id       - Get booking details
PUT    /api/bookings/:id       - Update booking
DELETE /api/bookings/:id       - Cancel booking
GET    /api/bookings/property/:id - Get property bookings (Admin)
```

### Favorite Endpoints
```
POST   /api/favorites          - Add to favorites
DELETE /api/favorites/:propertyId - Remove from favorites
GET    /api/favorites          - Get user's favorites
```

---

## Authentication Flow

### JWT-based Authentication

```
1. User Login
   ├─ Frontend sends credentials to /api/auth/login
   ├─ Backend validates credentials
   ├─ Backend generates JWT token
   └─ JWT sent to frontend (in response body or httpOnly cookie)

2. Protected Request
   ├─ Frontend includes JWT in Authorization header
   ├─ Backend middleware verifies JWT
   ├─ If valid → Continue to controller
   ├─ If invalid → Return 401 Unauthorized
   └─ If expired → Return 401 with 'token expired' message

3. Token Refresh
   ├─ Frontend detects expired token
   ├─ Sends refresh endpoint request
   ├─ Backend validates refresh token
   ├─ Issues new access token
   └─ Frontend retries original request

4. Logout
   ├─ Frontend sends logout request
   ├─ Backend invalidates token (optional)
   └─ Frontend clears stored JWT
```

### Role-based Authorization

```
Admin Routes:
├─ /api/properties (POST, PUT, DELETE)
├─ /api/services (POST, PUT, DELETE)
├─ /api/users (GET all)
├─ /api/bookings (GET all)
└─ /admin/* pages

User Routes:
├─ /api/properties (GET)
├─ /api/bookings (POST - own bookings)
├─ /api/favorites (POST, DELETE, GET)
└─ /api/users/profile (GET, PUT)
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd PropEase/PROPEASE

# Install dependencies
npm install

# Create .env file (if needed)
VITE_API_URL=http://localhost:5000

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup

```bash
# Navigate to backend directory
cd PropEase/backend

# Install dependencies
npm install

# Create .env file
MONGO_URI=mongodb://localhost:27017/propease
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/propease

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRE=30d

NODE_ENV=development
PORT=5000

# Optional: Email configuration (for password reset, notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# Cloud storage (if using image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

### MongoDB Setup

```bash
# Local MongoDB
# Ensure MongoDB service is running
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# MongoDB Atlas (Cloud)
# 1. Create account at https://www.mongodb.com/cloud/atlas
# 2. Create a cluster
# 3. Get connection string
# 4. Add to .env as MONGO_URI
```

### Running the Full Stack

```bash
# Terminal 1 - Frontend
cd PropEase/PROPEASE
npm run dev
# Visit: http://localhost:5173

# Terminal 2 - Backend
cd PropEase/backend
npm run dev
# Server running: http://localhost:5000

# Terminal 3 - MongoDB (if local)
mongod
```

---

## Development Workflow

### Adding a New Feature

1. **Database**: Create/update Mongoose schema
2. **Backend Route**: Add endpoint in routes/
3. **Backend Controller**: Implement logic in controllers/
4. **Backend Middleware**: Implement auth/validation if needed
5. **Frontend Service**: Create API call function
6. **Frontend Component**: Build UI component
7. **Testing**: Test with Postman and browser

### Code Organization Best Practices

```javascript
// ✅ GOOD: Modular and organized
- controllers/propertyController.js (just handlers)
- services/propertyService.js (business logic)
- models/Property.js (schema only)
- routes/properties.js (routing only)

// ❌ BAD: Everything in one file
- controllers/index.js (everything mixed)
```

---

## Performance Optimization Tips

1. **Frontend**:
   - Lazy load components with React.lazy()
   - Optimize images
   - Implement pagination for property lists
   - Add caching strategies

2. **Backend**:
   - Create database indexes
   - Implement caching (Redis)
   - Pagination for large datasets
   - Compression middleware

3. **Database**:
   - Index frequently queried fields
   - Denormalize where appropriate
   - Archive old data

---

## Security Considerations

1. **Environment Variables**: Store all secrets in .env
2. **CORS**: Configure CORS to allow only your frontend domain
3. **Password Hashing**: Use bcrypt with salt rounds ≥ 10
4. **JWT Secret**: Use strong, random secret keys
5. **Rate Limiting**: Implement rate limiting on auth endpoints
6. **Input Validation**: Validate all user inputs
7. **SQL/NoSQL Injection**: Use mongoose parameterized queries
8. **HTTPS**: Use HTTPS in production
9. **CSRF Protection**: Implement CSRF tokens if needed
10. **XSS Protection**: Sanitize user input before displaying

---

## Error Handling

### Common HTTP Status Codes

```
200 OK                    - Success
201 Created              - Resource created
400 Bad Request          - Invalid input
401 Unauthorized         - Authentication required
403 Forbidden            - No permission
404 Not Found            - Resource not found
409 Conflict             - Resource already exists
422 Unprocessable Entity - Validation error
500 Server Error         - Internal server error
503 Service Unavailable  - Server temporarily down
```

---

## Testing Strategy

### Frontend Testing
```bash
npm install --save-dev @testing-library/react vitest
# Write component tests in __tests__ folders
```

### Backend Testing
```bash
npm install --save-dev jest supertest
# Write API tests in tests/ folder
npm run test
```

---

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
# Set environment variables on platform
# Deploy repository
# Or use: git push heroku main
```

---

## Future Enhancements

- [ ] **Search & Filters**: Advanced property search
- [ ] **Payment Integration**: Stripe/Razorpay for bookings
- [ ] **Real-time Chat**: Socket.io for property owner communication
- [ ] **Image Upload**: Cloudinary or AWS S3
- [ ] **Notifications**: Email/SMS alerts
- [ ] **Maps Integration**: Google Maps for location
- [ ] **Analytics Dashboard**: Property analytics for admins
- [ ] **Mobile App**: React Native version
- [ ] **Reviews & Ratings**: User reviews
- [ ] **Wishlist**: Save favorite properties

---

## Useful Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [REST API Best Practices](https://restfulapi.net/)

---

## Contact & Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Last Updated**: April 4, 2026
**Version**: 1.0.0
**Status**: In Development 🚀
