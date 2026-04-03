export const initialProperties = [
  {
    id: 1,
    title: "New Apartment Nice View",
    price: 50000,
    location: "Vijay Nagar, Indore",
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 2000,
    type: "For Rent",
    description:
      "Beautiful Huge 1 Family House In Heart Of Indore. Newly Renovated With New Wood. This stunning apartment offers modern amenities with a perfect view of the city.",
    owner: { name: "Aditya Sharma", phone: "+91-9876543210", email: "aditya.sharma@homeverse.com" },
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    amenities: ["Parking", "Elevator", "Security", "Water Supply", "Power Backup"],
    available: true,
  },
  {
    id: 2,
    title: "Modern Apartments",
    price: 30000,
    location: "Tilak Nagar, Indore",
    bedrooms: 2,
    bathrooms: 1,
    squareFt: 1200,
    type: "For Sale",
    description:
      "Modern design with contemporary fixtures and fittings. Perfect for small families or working professionals looking for a comfortable living space.",
    owner: { name: "Shubham Gupta", phone: "+91-9876543212", email: "shubham.gupta@homeverse.com" },
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    amenities: ["Parking", "Security", "Water Supply"],
    available: true,
  },
  {
    id: 3,
    title: "Comfortable Apartment",
    price: 50000,
    location: "Bhawarkuan, Indore",
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 1500,
    type: "For Rent",
    description:
      "A cozy and comfortable living space with all modern amenities. Located in a prime area with easy access to markets, schools, and hospitals.",
    owner: { name: "Prakhar Nayak", phone: "+91-9876543213", email: "prakhar.nayak@homeverse.com" },
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    amenities: ["Parking", "Elevator", "Security", "Water Supply", "Power Backup", "Gym"],
    available: true,
  },
  {
    id: 4,
    title: "Luxury Villa Rego Park",
    price: 120000,
    location: "Rajendra Nagar, Indore",
    bedrooms: 5,
    bathrooms: 4,
    squareFt: 4200,
    type: "For Sale",
    description:
      "An exquisite luxury villa with premium finishes, private pool, and landscaped gardens. A masterpiece of modern architecture in an exclusive neighborhood.",
    owner: { name: "Rahul Mehta", phone: "+91-9876543214", email: "rahul.mehta@homeverse.com" },
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    amenities: ["Parking", "Pool", "Gym", "Security", "Garden", "Power Backup"],
    available: true,
  },
];

export const initialServices = [
  {
    id: 1,
    title: "Buy a Home",
    icon: "🏠",
    short: "Over 1 million+ homes for sale. We match you with the house you'll want to call home.",
    full: "Ready to purchase your dream home? Our comprehensive buying service helps you find and purchase the perfect property. With access to over 1 million+ properties, our experienced agents guide you through every step.",
    features: ["1 Million+ Properties", "Expert Agents", "Property Inspection", "Mortgage Assistance", "Legal Support", "Post-Purchase Support"],
    process: ["Browse property listings", "Schedule property visits", "Get inspection & valuation", "Apply for home loan", "Negotiate best price", "Complete paperwork", "Take possession!"],
  },
  {
    id: 2,
    title: "Rent a Home",
    icon: "🔑",
    short: "Over 100+ homes for rent available. We match you with a house you'll want to call home.",
    full: "Looking for the perfect rental? Our comprehensive rental service helps you find your ideal home with over 100+ properties across various locations.",
    features: ["100+ Available Properties", "Expert Matching", "Virtual Tours", "Flexible Lease Terms", "24/7 Support", "No Hidden Fees"],
    process: ["Browse property listings", "Schedule a viewing", "Submit rental application", "Get approved & sign lease", "Move into your new home!"],
  },
  {
    id: 3,
    title: "Sell a Home",
    icon: "💰",
    short: "We help property owners get the best value for their homes with expert valuation and marketing.",
    full: "Ready to sell? Our professional selling service makes the process smooth and stress-free. We handle everything from listing to closing.",
    features: ["Free Valuation", "Professional Photography", "Strategic Marketing", "Expert Negotiation", "Legal Support", "Quick Sale Process"],
    process: ["Free property valuation", "Professional photography", "List on multiple platforms", "Show to potential buyers", "Negotiate & finalize", "Complete legal formalities"],
  },
  {
    id: 4,
    title: "Property Management",
    icon: "🏢",
    short: "Comprehensive property management services to take care of your rental properties professionally.",
    full: "Need help managing your rental property? Our professional management service takes care of everything from tenant screening to maintenance.",
    features: ["Tenant Screening", "Rent Collection", "Property Maintenance", "24/7 Emergency Support", "Legal Compliance", "Financial Reporting"],
    process: ["Consultation & assessment", "Create management plan", "Tenant screening", "Lease preparation", "Ongoing maintenance", "Monthly reporting"],
  },
];

export const usersData = [
  { id: 1, username: "kushagra", password: "kushagra123", email: "admin@homeverse.com", name: "Admin User", role: "admin" },
  { id: 2, username: "user", password: "user123", email: "user@homeverse.com", name: "Regular User", role: "user" },
];

export const amenityIcons = {
  Parking: "🚗", Elevator: "🛗", Security: "🛡️", "Water Supply": "💧",
  "Power Backup": "⚡", Gym: "🏋️", Pool: "🏊", Garden: "🌿",
};