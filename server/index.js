import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Only allow frontend origin
  credentials: true,
  optionsSuccessStatus: 200
};


// CORS middleware
app.use(cors(corsOptions));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Book Management API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});