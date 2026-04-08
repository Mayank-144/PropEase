import mongoose from 'mongoose';
import 'dotenv/config.js';
import User from '../models/User.js';
import Property from '../models/Property.js';
import Service from '../models/Service.js';
import { connectDB } from '../config/database.js';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

const users = [
  { firstName: "Mayank", lastName: "Admin", username: "Mayank", password: "123", email: "admin@homeverse.com", role: "admin" },
  { firstName: "Regular", lastName: "User", username: "user", password: "user123", email: "user@homeverse.com", role: "user" },
];

const properties = [
  {
    title: "New Apartment Nice View",
    price: 50000,
    location: "Vijay Nagar, Indore",
    address: { city: "Indore" },
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 2000,
    type: "For Rent",
    description: "Beautiful Huge 1 Family House In Heart Of Indore. Newly Renovated With New Wood.",
    amenities: ["Parking", "Elevator", "Security", "Water Supply", "Power Backup"],
    images: [{ url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" }],
    available: true,
  },
  {
    title: "Modern Apartments",
    price: 30000,
    location: "Tilak Nagar, Indore",
    address: { city: "Indore" },
    bedrooms: 2,
    bathrooms: 1,
    squareFt: 1200,
    type: "For Sale",
    description: "Modern design with contemporary fixtures and fittings.",
    amenities: ["Parking", "Security", "Water Supply"],
    images: [{ url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" }],
    available: true,
  },
  {
    title: "Comfortable Apartment",
    price: 50000,
    location: "Bhawarkuan, Indore",
    address: { city: "Indore" },
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 1500,
    type: "For Rent",
    description: "A cozy and comfortable living space with all modern amenities.",
    amenities: ["Parking", "Elevator", "Security", "Water Supply", "Power Backup", "Gym"],
    images: [{ url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80" }],
    available: true,
  },
  {
    title: "Luxury Villa Rego Park",
    price: 120000,
    location: "Rajendra Nagar, Indore",
    address: { city: "Indore" },
    bedrooms: 5,
    bathrooms: 4,
    squareFt: 4200,
    type: "For Sale",
    description: "An exquisite luxury villa with premium finishes.",
    amenities: ["Parking", "Pool", "Gym", "Security", "Garden", "Power Backup"],
    images: [{ url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" }],
    available: true,
  },
];

const services = [
  {
    title: "Buy a Home",
    icon: "🏠",
    short: "Over 1 million+ homes for sale.",
    full: "Ready to purchase your dream home? Our comprehensive buying service helps you find and purchase the perfect property.",
    features: ["1 Million+ Properties", "Expert Agents"],
  },
  {
    title: "Rent a Home",
    icon: "🔑",
    short: "Over 100+ homes for rent available.",
    full: "Looking for the perfect rental? Our comprehensive rental service helps you find your ideal home.",
    features: ["100+ Available Properties", "Expert Matching"],
  },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await Service.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Map properties to admin user
    const sampleProperties = properties.map(p => ({ ...p, owner: { userId: adminUser, name: "Admin", phone: "7000705887", email: "admin@homeverse.com" } }));
    await Property.insertMany(sampleProperties);

    // Insert services
    await Service.insertMany(services);

    console.log('✓ Data Imported Successfully');
    process.exit();
  } catch (error) {
    console.error(`✗ Error with data import:`, error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Property.deleteMany();
    await Service.deleteMany();

    console.log('✓ Data Destroyed Successfully');
    process.exit();
  } catch (error) {
    console.error(`✗ Error with data destruction: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
