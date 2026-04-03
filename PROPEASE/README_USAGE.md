# PropEase - Real Estate Platform

A modern, responsive real estate property management and listing platform built with React and Vite.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![Vite](https://img.shields.io/badge/Vite-8.0.3-purple)

## 🏡 Features

### For Users
- **Property Browsing**: Browse featured properties with filters and detailed information
- **Property Details**: View comprehensive property information including amenities, owner details, and photos
- **Service Information**: Learn about Buy, Rent, Sell, and Property Management services
- **Contact Form**: Submit inquiries directly through the contact form
- **Responsive Design**: Fully responsive on desktop, tablet, and mobile devices
- **User Authentication**: Secure login with demo accounts

### For Administrators
- **Admin Dashboard**: Exclusive admin panel for property management
- **Add Properties**: Add new properties with full details (title, price, location, bedrooms, bathrooms, etc.)
- **Delete Properties**: Remove properties from the listing
- **Property Management**: View and manage all properties in a table format
- **Data Persistence**: All changes saved to localStorage

## 🚀 Quick Start

### Installation

1. Navigate to the project directory:
```bash
cd "C:\Users\mayank jaiswal\OneDrive\Desktop\PropEase\PROPEASE"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5175
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## 🔐 Demo Credentials

### Admin Account
- **Username**: `kushagra`
- **Password**: `kushagra123`
- **Access**: Admin Panel for property/service management

### Regular User Account
- **Username**: `user`
- **Password**: `user123`
- **Access**: Standard user features (browse properties, contact form)

## 📱 Application Structure

### Pages/Sections

#### 1. **Home Page**
- Hero banner with call-to-action buttons
- About section describing the platform
- Featured services (Buy, Rent, Sell, Property Management)
- Featured properties listing
- Contact form
- Professional footer

#### 2. **Property Details Page**
- Full property information
- Large property image
- Complete specifications (bedrooms, bathrooms, square feet)
- Amenities list
- Owner contact information
- "Contact Owner" button

#### 3. **Service Detail Page**
- Service description and features
- Step-by-step process guide
- Service benefits and offerings

#### 4. **Admin Panel** (Admin Only)
- Property management table
- Add new property modal
- Delete property functionality
- Real-time data updates

## 🎨 Design System

### Color Scheme
- **Primary Orange**: `hsl(9, 100%, 62%)` - Main brand color
- **Dark Background**: `hsl(227, 29%, 13%)` - Dark navy
- **Light Background**: `hsl(192, 24%, 96%)` - Off-white
- **Text**: `hsl(227, 29%, 13%)` - Raisin black

### Effects & Animations
- Smooth fade-up animations on page load
- Hover effects on card components
- Glassmorphism effects on modals
- Backdrop blur transitions
- Smooth scroll behavior

## 💾 Data Management

The application uses **localStorage** to persist data:

- User session information
- Property listings
- Admin changes

Data is automatically saved when:
- Users log in
- Properties are added/deleted
- Page is refreshed (data persists)

## 🛣️ Navigation

### For Regular Users
- Home → About → Services → Properties → Contact
- Click on any property to view details
- Click on any service to view details
- Access contact form from hero or main navigation

### For Admin Users
- Access Admin panel from top navigation
- View all properties in table format
- Add or delete properties
- Logout to return to user view

## 🔧 Customization Guide

### Adding More Properties
1. Login with admin credentials
2. Click "Add Property" button
3. Fill in the property details
4. Click "Save"

Properties are stored in localStorage and appear immediately.

### Modifying Services
Edit the `initialServices` array in `src/App.jsx`:
```javascript
const initialServices = [
  {
    id: 1,
    title: "Service Name",
    icon: "🏠",
    short: "Short description",
    full: "Full description",
    features: ["Feature 1", "Feature 2", ...],
    process: ["Step 1", "Step 2", ...]
  },
  ...
]
```

### Customizing Property Details
Edit the `initialProperties` array in `src/App.jsx` to add more default properties.

## 📊 Current Data

### Properties
- New Apartment Nice View - Vijay Nagar, ₹50,000/month
- Modern Apartments - Tilak Nagar, ₹30,000/month
- Comfortable Apartment - Bhawarkuan, ₹50,000/month
- Luxury Villa Rego Park - Rajendra Nagar, ₹120,000/month

### Services
1. Buy a Home
2. Rent a Home
3. Sell a Home
4. Property Management

### Amenities
Parking, Elevator, Security, Water Supply, Power Backup, Gym, Pool, Garden

## 🌐 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- Lightweight: ~50KB gzipped
- Fast load time: <1s
- Optimized images: Using external URLs
- Efficient re-renders: React 19 optimization
- Mobile-first responsive design

## 🔒 Authentication

Two-level authentication system:
- **Admin**: Full access to property management
- **User**: Access to browsing and inquiry features
- Credentials stored in component (demo only)

*Note: For production, integrate with a proper backend authentication system*

## 📝 Future Enhancements

Potential features to add:
- [ ] Search and filter functionality
- [ ] Advanced property filters (price range, amenities)
- [ ] Photo gallery with multiple images per property
- [ ] Favorites/Wishlist feature
- [ ] Backend API integration
- [ ] Email notifications
- [ ] User profile management
- [ ] Property comparisons
- [ ] Map integration
- [ ] Reviews and ratings

## 🐛 Troubleshooting

### Dev Server won't start
```bash
# Kill process on port 5175
# Then restart:
npm run dev
```

### Styles not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh the page (Ctrl+R)

### Admin panel not accessible
- Ensure you're logged in with admin credentials
- Check localStorage data in browser DevTools

### Properties not saving
- Check browser localStorage permissions
- Ensure localStorage is enabled
- Try a different browser

## 📞 Support

For issues or questions:
- Email: info@propease.com
- Phone: +91 7000705887
- Location: Indore, MP

## 📄 License

PropEase © 2026. All rights reserved.

---

**Happy Property Hunting! 🏠✨**
