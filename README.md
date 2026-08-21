# 🏡 PropEase — Real Estate & Property Management Platform

> A full-stack MERN real estate platform that connects property seekers, owners, and administrators with real-time inquiries, interactive property listings, secure authentication, and payment integrations.

---

## ✨ Features

- 🔐 **User Authentication** - Secure Login and Signup with JWT and role-based access (User vs. Admin)
- 🏠 **Property Discovery** - Browse, search, and filter properties by location, price, and category
- 📸 **Cloud Image Uploads** - High-resolution property image uploads powered by Cloudinary & Multer
- 💬 **Real-Time Inquiries** - Live communication and notifications powered by Socket.io
- 🛠️ **Admin Management Panel** - Full CRUD dashboard to add, edit, and delete property listings
- 💳 **Online Payments** - Secure booking payments integrated with Razorpay
- 📜 **Booking & History Tracking** - Manage scheduled visits, sent inquiries, and transaction records
- 🎨 **Premium UI/UX** - Clean, responsive glassmorphism interface with smooth animations and mobile support

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, React Router 7, Socket.io-client, Zod, Vanilla CSS |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB & Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js |
| **Media & Storage** | Cloudinary, Multer |
| **Payments & Notifications** | Razorpay, Nodemailer |

---

## 📁 Project Structure

```text
PropEase/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── Card/               # Property card components
│   │   ├── Components/         # Navbar, Footer, Modals & UI components
│   │   ├── context/            # AuthContext & SocketContext
│   │   ├── pages/              # Home, PropertyDetail, AdminPanel, MyHistory, Login
│   │   ├── services/           # Backend API integration services
│   │   ├── utils/              # Client helper functions & validators
│   │   ├── App.jsx             # Main router & application layout
│   │   ├── main.jsx            # App entry point
│   │   └── index.css           # Global design system & theme styles
│   ├── jsconfig.json           # Path alias (@/*) configuration
│   └── package.json            # Client dependencies & scripts
│
├── server/                     # Node.js Backend (Express)
│   ├── src/
│   │   ├── config/             # DB, Cloudinary & Razorpay configurations
│   │   ├── controllers/        # Auth, Property, Booking, Payment controllers
│   │   ├── middleware/         # Auth verification & Multer upload middleware
│   │   ├── models/             # User, Property, Booking, Message schemas
│   │   ├── routes/             # Express API routes
│   │   ├── utils/              # Database seeder & email utilities
│   │   └── server.js           # Express + Socket.io server entry point
│   └── package.json            # Server dependencies & scripts
│
├── docs/                       # In-depth architectural & setup guides
│   ├── SETUP_GUIDE.md          # Detailed installation walkthrough
│   ├── MERN_ARCHITECTURE.md    # Architecture & system design
│   ├── DATABASE_SCHEMA.md      # MongoDB schemas and models
│   └── TESTING_GUIDE.md        # API & frontend testing guide
│
├── .env.example                # Sample environment variables template
├── package.json                # Root package.json (concurrent runner)
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18+` or higher
- **npm** or **yarn**
- **MongoDB**: Local instance running OR a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI
- **Cloudinary Account**: (Optional - for image uploads)

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd PROPEASE/PropEase-1
   ```

2. **Install all dependencies (Root, Server & Client)**:
   ```bash
   npm run install:all
   ```
   *(Or individually: `cd server && npm install` then `cd ../client && npm install`)*

---

### Configure Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/propease

# Frontend Origin URL
CLIENT_URL=http://localhost:5173

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRE=30d

# Cloudinary (Optional - for property images)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay (Optional - for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```

---

### Database Seeding (Optional)

To seed your MongoDB database with initial sample properties and demo accounts:

```bash
npm run data:import
```

*(To remove sample data at any time: `npm run data:destroy`)*

---

### Running the Application

#### Option 1: Start Both Frontend & Backend Together (Recommended)
From the root directory:
```bash
npm run dev
```

#### Option 2: Start Separately
- **Start Backend Server**:
  ```bash
  cd server
  npm run dev
  ```
  *Server runs on `http://localhost:5000`*

- **Start Frontend Client**:
  ```bash
  cd client
  npm run dev
  ```
  *Client runs on `http://localhost:5173`*

---

## 🔐 Demo Credentials

Use these seeded accounts to test the application:

| Role | Email / Username | Password | Access Level |
|---|---|---|---|
| **Admin** | `admin@propease.com` / `Mayank` | `123` *(or `admin123`)* | Full admin dashboard, create/edit/delete properties, view inquiries |
| **Regular User** | `user@propease.com` / `user` | `user123` | Browse properties, send inquiries, book visits, view history |

---

## 📖 Usage

### For Property Seekers & Buyers
1. Open `http://localhost:5173`
2. Browse featured properties on the home page or search by location & price.
3. Click any property card to view high-res images, amenities, pricing, and owner details.
4. Use the **Contact Owner** or **Book Visit** button to submit an inquiry.
5. Visit **My History** from the navigation bar to track all your booked tours and messages.

### For Administrators
1. Log in using the Admin credentials (`Mayank` / `123` or `admin@propease.com`).
2. Click **Admin Panel** in the top navigation.
3. Use the **Add Property** button to upload photos and fill in listing specs (price, bedrooms, location, amenities).
4. Edit or delete existing properties in the real-time table.

---

## 📡 API Endpoints

All backend endpoints are prefixed with `/api`:

| Module | Method | Endpoint | Description | Access |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/auth/register` | Register new user account | Public |
| **Auth** | `POST` | `/api/auth/login` | Log in and get JWT token | Public |
| **Auth** | `GET` | `/api/auth/me` | Fetch current user profile | Authenticated |
| **Properties** | `GET` | `/api/properties` | Fetch all properties (supports query filters) | Public |
| **Properties** | `GET` | `/api/properties/:id` | Get details of a single property | Public |
| **Properties** | `POST` | `/api/properties` | Create a new property listing | Admin / Agent |
| **Properties** | `PUT` | `/api/properties/:id` | Update an existing property | Admin / Owner |
| **Properties** | `DELETE` | `/api/properties/:id` | Delete a property | Admin / Owner |
| **Bookings** | `POST` | `/api/bookings` | Book a property visit / inquiry | Authenticated |
| **Bookings** | `GET` | `/api/bookings/my` | Get current user's bookings | Authenticated |
| **Payment** | `POST` | `/api/payment/create-order` | Create Razorpay order | Authenticated |

---

## 🐛 Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| **MongoDB connection error** | MongoDB is not running or URI is invalid | Start local MongoDB service or verify `MONGO_URI` in `server/.env`. Whitelist your IP in MongoDB Atlas (`0.0.0.0/0`). |
| **Port 5000 or 5173 in use** | Another process is using the port | Change `PORT=5001` in `server/.env` and update frontend API URL. |
| **Images not uploading** | Cloudinary keys missing or incorrect | Check `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `server/.env`. |
| **CORS error in browser** | Mismatched frontend origin | Ensure `CLIENT_URL=http://localhost:5173` in `server/.env` matches your client port. |

---

## 🚀 Deployment

### Deploying the Backend (Render / Railway / Heroku)
1. Push your code to GitHub.
2. Create a new **Web Service** on [Render](https://render.com/).
3. Connect your repository.
4. Set **Root Directory** to `server`.
5. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
6. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, etc.).

### Deploying the Frontend (Vercel / Netlify / Render)
1. Create a new project on [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
2. Connect your repository.
3. Set **Root Directory** to `client`.
4. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. Add the Environment Variable `VITE_API_URL` pointing to your deployed backend URL (e.g. `https://your-backend.onrender.com`).

---

## 👨‍💻 Author & Contributions

Created by **Mayank Jaiswal** ([@Mayank-144](https://github.com/Mayank-144)).

---

## 📝 License

MIT License - feel free to use and customize for your own projects.

**Built with ❤️ by Mayank Jaiswal using React, Node.js, and MongoDB.**
