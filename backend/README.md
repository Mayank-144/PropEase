# PropEase Backend - Node.js + Express + MongoDB

## 📋 Overview

PropEase Backend API is a RESTful API built with Node.js, Express, and MongoDB. It provides endpoints for managing properties, users, services, and bookings in the real estate platform.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# MONGO_URI=mongodb://localhost:27017/propease
# JWT_SECRET=your_secret_key
# PORT=5000
```

### Running the Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Server will start on http://localhost:5000
```

## 📁 Project Structure

```
src/
├── config/           # Configuration files
│   ├── database.js   # MongoDB connection
│   └── constants.js  # App constants
├── models/          # Mongoose schemas
│   ├── User.js
│   ├── Property.js
│   ├── Service.js
│   ├── Booking.js
│   └── Favorite.js
├── controllers/     # Request handlers
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
└── server.js        # Server entry point
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** → Get access token
2. **Include token** in Authorization header: `Bearer <token>`
3. **Token expiry** handled with refresh tokens

### Sample Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛣️ API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
GET    /api/auth/me
```

### Properties
```
GET    /api/properties
GET    /api/properties/:id
GET    /api/properties/featured
GET    /api/properties/search?query=
POST   /api/properties (Admin)
PUT    /api/properties/:id (Admin)
DELETE /api/properties/:id (Admin)
```

### Services
```
GET    /api/services
GET    /api/services/:id
POST   /api/services (Admin)
PUT    /api/services/:id (Admin)
DELETE /api/services/:id (Admin)
```

### Bookings
```
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id/cancel
GET    /api/bookings/property/:propertyId (Admin)
PUT    /api/bookings/:id/status (Admin)
```

## 📝 Sample Requests

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get All Properties

```bash
curl -X GET http://localhost:5000/api/properties?page=1&limit=10
```

### Create Property (Requires Auth & Admin)

```bash
curl -X POST http://localhost:5000/api/properties \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Modern Apartment",
    "description":"Beautiful modern apartment",
    "price":50000,
    "type":"For Rent",
    "location":"Indore",
    "bedrooms":2,
    "bathrooms":1,
    "squareFt":1000
  }'
```

## 🧪 Testing with Postman

1. Import the API collection (create one or use Postman's built-in)
2. Set up environment variables:
   - `base_url`: http://localhost:5000
   - `token`: JWT token from login response
3. Test endpoints

## 🔧 Environment Variables

Create a `.env` file with:

```
# Database
MONGO_URI=mongodb://localhost:27017/propease

# Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRE=30d

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password

# Cloud Storage (Optional)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📊 Database Models

### User
- firstName, lastName
- email (unique)
- password (hashed)
- phone
- role (user/admin)
- address
- createdAt, updatedAt

### Property
- title, description
- price, type (For Sale/For Rent)
- location, address with coordinates
- bedrooms, bathrooms, squareFt
- amenities, images
- owner info
- available, featured
- views, ratings
- createdAt, updatedAt

### Service
- title (unique)
- icon, short, full descriptions
- features, process (arrays)
- isActive, order
- timestamps

### Booking
- userId (ref: User)
- propertyId (ref: Property)
- visitDate, visitTime
- purpose (viewing/inquiry)
- notes
- status (pending/confirmed/completed/cancelled)
- timestamps

### Favorite
- userId (ref: User)
- propertyId (ref: Property)
- unique index on userId + propertyId

## 🛡️ Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: ODM for MongoDB
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **validator**: Input validation

## 🔄 Integration with Frontend

Frontend should:

1. Call login endpoint → receive token
2. Store token in localStorage: `localStorage.setItem('hv_token', token)`
3. Include token in all requests:
   ```javascript
   Authorization: `Bearer ${token}`
   ```
4. Handle token expiry → call refresh-token endpoint
5. Logout → clear stored token

## 🐛 Debugging

Enable debug logs by setting:
```
NODE_ENV=development
LOG_LEVEL=debug
```

View logs in terminal when running `npm run dev`

## 📦 Deployment

### Heroku
```bash
git init
heroku create propease-api
git push heroku main
```

### Railway/DigitalOcean
1. Push to git repository
2. Connect to Railway/DigitalOcean
3. Set environment variables
4. Deploy

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT

## 🙋 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🚀**
