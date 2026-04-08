# 🚀 PropEase - Complete MERN Stack Setup Guide

This guide covers the complete setup for the PropEase Real Estate Platform using the MERN stack.

---

## 📋 Prerequisites

- **Node.js** v18+ (Download from [nodejs.org](https://nodejs.org/))
- **MongoDB** (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([download](https://git-scm.com/))
- **VS Code** or any code editor
- **Postman** (Optional, for API testing) ([download](https://www.postman.com/))

### Verify Installation

```bash
node --version      # Should be v18+
npm --version       # Should be v9+
mongodb --version   # For local MongoDB
git --version       # Should show git version
```

---

## 📂 Project Structure

```
PropEase/
├── PROPEASE/                 # Frontend (React + Vite)
├── backend/                  # Backend (Node.js + Express)
├── MERN_ARCHITECTURE.md      # Architecture documentation
├── DATABASE_SCHEMA.md        # Database schema documentation
└── SETUP_GUIDE.md           # This file
```

---

## 🗄️ Step 1: MongoDB Setup

### Option A: Local MongoDB Installation

**Windows**:
1. Download installer from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run installer and follow setup wizard
3. MongoDB Community Server will install
4. Verify: Open Command Prompt and run `mongod`

**macOS** (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux** (Ubuntu):
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster (free tier available)
4. Create database user with password
5. Add your IP to whitelist
6. Get connection string from "Connect" button
7. Format: `mongodb+srv://username:password@cluster.mongodb.net/propease`

### Verify MongoDB Connection

```bash
# For local MongoDB
mongo
# or
mongosh

# Check databases
show databases

# Exit
exit
```

---

## 🎨 Step 2: Frontend Setup (React + Vite)

### Navigate to Frontend Directory

```bash
cd PropEase/PROPEASE
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
# Windows
copy .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

### Configure Environment Variables

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000
```

### Start Development Server

```bash
npm run dev
```

**Output**:
```
  VITE v8.0.1  ready in XXms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Visit: **http://localhost:5173**

### Frontend Test Users

Login with these credentials:

```
Email:    admin@propease.com
Password: admin123
Role:     Admin

---

Email:    user@propease.com
Password: user123
Role:     User
```

---

## ⚙️ Step 3: Backend Setup (Node.js + Express)

### Open New Terminal

```bash
cd PropEase/backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

### Configure Environment Variables

Edit `.env`:

```env
# Database
MONGO_URI=mongodb://localhost:27017/propease
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/propease

# Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d  
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
REFRESH_TOKEN_EXPIRE=30d
```

### Start Development Server

```bash
npm run dev
```

**Output**:
```
✓ MongoDB Connected: localhost
✓ Server running on http://localhost:5000
🚀 PropEase API Server is ready
```

Visit: **http://localhost:5000** (Health check endpoint: /api/health)

---

## 🔄 Step 4: Verify Full Stack is Running

### Check All Services

```bash
# Frontend - Terminal 1
# http://localhost:5173 ✅

# Backend - Terminal 2
# http://localhost:5000 ✅

# MongoDB - Should be running
# mongosh (if local) ✅
```

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-04-04T10:30:00.000Z"
}
```

### Test Frontend

Open browser and visit: **http://localhost:5173**

You should see the PropEase homepage with login option.

---

## 🧪 Step 5: API Testing with Postman

### Import Collection

1. Open Postman
2. Create new API collection named "PropEase"
3. Add requests for each endpoint

### Example Requests

#### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@propease.com",
  "password": "admin123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "email": "admin@propease.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "..."
  }
}
```

#### Get All Properties
```
GET http://localhost:5000/api/properties?page=1&limit=10
```

#### Create Property (Admin Only)
```
POST http://localhost:5000/api/properties
Authorization: Bearer <token_from_login>
Content-Type: application/json

{
  "title": "Modern Apartment",
  "description": "Beautiful modern apartment in the heart of the city",
  "price": 50000,
  "type": "For Rent",
  "location": "Indore",
  "bedrooms": 3,
  "bathrooms": 2,
  "squareFt": 1500,
  "amenities": ["Parking", "Security", "Water Supply"]
}
```

---

## 📁 Important Files & Directories

### Frontend
| File | Purpose |
|------|---------|
| `PROPEASE/src/App.jsx` | Main app component |
| `PROPEASE/src/context/AppContext.jsx` | Global state management |
| `PROPEASE/src/services/` | API call services |
| `PROPEASE/src/hooks/` | Custom React hooks |
| `PROPEASE/vite.config.js` | Vite configuration |
| `PROPEASE/package.json` | Dependencies |

### Backend
| File | Purpose |
|------|---------|
| `backend/src/server.js` | Server entry point |
| `backend/src/models/` | MongoDB schemas |
| `backend/src/controllers/` | Request handlers |
| `backend/src/routes/` | API endpoints |
| `backend/src/middleware/` | Auth, validation, error handling |
| `backend/.env` | Environment variables |
| `backend/package.json` | Dependencies |

---

## 🔧 Common Commands

### Frontend Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Commands

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# Run tests
npm test

# Watch mode for tests
npm run test:watch
```

### MongoDB Commands (Local)

```bash
# Start MongoDB service
mongod

# Connect to MongoDB
mongosh

# View databases
show databases

# Switch database
use propease

# View collections
show collections

# Find documents
db.users.find()

# Count documents
db.properties.countDocuments()
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseConnectionError`

**Solution**:
```bash
# Check if MongoDB is running
# For local: mongod should be running
# For Atlas: Check connection string and IP whitelist
```

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows - Find process using port
netstat -ano | findstr :5000
taskkill /PID <pid> /F

# macOS/Linux
lsof -i :5000
kill -9 <pid>
```

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:
- Check `.env` file has correct `CLIENT_URL`
- Backend should have: `origin: process.env.CLIENT_URL`

### Token Expired

**Error**: `Token has expired`

**Solution**:
- Login again to get new token
- Or use refresh-token endpoint

---

## 📊 Database Management

### View Collections

```bash
# Connect to MongoDB
mongosh

# Switch to propease database
use propease

# Show all collections
show collections

# View sample user
db.users.findOne()

# Count properties
db.properties.countDocuments()
```

### Backup Database

```bash
# Local MongoDB
mongodump --db propease --out ./backup

# MongoDB Atlas
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/propease" --out ./backup
```

### Restore Database

```bash
mongorestore --db propease ./backup/propease
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

**Vercel**:
```bash
npm install -g vercel
vercel
```

**Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

### Backend Deployment (Railway/Heroku)

**Railway**:
1. Push to GitHub
2. Connect GitHub to Railway
3. Set environment variables
4. Deploy

**Heroku**:
```bash
heroku login
heroku create propease-api
git push heroku main
```

---

## 📝 Environment Variables Checklist

### Frontend (.env.local)
- [ ] `VITE_API_URL` = Backend URL

### Backend (.env)
- [ ] `MONGO_URI` = MongoDB connection string
- [ ] `NODE_ENV` = development/production
- [ ] `PORT` = 5000  
- [ ] `CLIENT_URL` = Frontend URL
- [ ] `JWT_SECRET` = Long random string
- [ ] `REFRESH_TOKEN_SECRET` = Long random string

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

---

## 🤝 Support & Issues

If you encounter any issues:

1. Check the terminal for error messages
2. Review the troubleshooting section
3. Check environment variables
4. Verify all services are running
5. Create an issue in the repository

---

## ✅ Setup Verification Checklist

After following all steps, verify:

- [ ] Node.js v18+ installed
- [ ] MongoDB running (local or Atlas)
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Frontend .env configured
- [ ] Backend .env configured
- [ ] Frontend server running on port 5173
- [ ] Backend server running on port 5000
- [ ] Can login to frontend
- [ ] Can call backend API endpoints
- [ ] MongoDB has collections created

---

## 🎉 You're All Set!

Your PropEase MERN stack application is now ready for development!

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:5000  
**Database**: MongoDB (local or Atlas)

Happy coding! 🚀

---

**Last Updated**: April 4, 2026  
**Version**: 1.0.0
