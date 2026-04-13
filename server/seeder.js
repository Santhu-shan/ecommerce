import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://santhaseelanjs:santha123@cluster0.lja1hzg.mongodb.net/ecommercedb?retryWrites=true&w=majority&appName=Cluster0';

const dummyProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    stock: 25,
  },
  {
    name: 'Minimalist Smartwatch Series 7',
    description: 'Track your fitness, heart rate, and notifications on the go. Features an edge-to-edge OLED display and water resistance.',
    price: 399.00,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop',
    stock: 14,
  },
  {
    name: 'Ultra-Slim 4K Luminous Monitor',
    description: 'Seamless 27-inch 4K IPS display perfect for gaming and professional design work. Features a sleek, frameless edge.',
    price: 450.50,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
    stock: 8,
  },
  {
    name: 'Mechanical RGB Gaming Keyboard',
    description: 'Customizable RGB backlighting with tactile mechanical switches designed for speed, precision, and a satisfying click.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
    stock: 50,
  },
  {
    name: 'Ergonomic Mesh Office Chair',
    description: 'Provides superior lumbar support and breathability for long working hours. Adjustable armrests and tilt mechanic.',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop',
    stock: 12,
  },
  {
    name: 'Pro DSLR Camera Body',
    description: 'Capture stunning photos with this 24MP full-frame DSLR camera. Excellent low-light performance and 4K video recording.',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    stock: 5,
  }
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected explicitly for seeding...');

    await Product.deleteMany(); // Clear existing products
    console.log('Existing products cleared.');

    await Product.insertMany(dummyProducts);
    console.log('Dummy products inserted successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

importData();
