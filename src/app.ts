import express from 'express';
import authRoutes from './routes/auth.route';
import authorRoutes from './routes/author.route';
import bookRoutes from './routes/book.route';
import borrowRoutes from './routes/borrow.route';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import { responseHandler } from './middlewares/responseHandler';

// Load environment variables from .env file
dotenv.config();

// Get the port from environment variables 
const PORT = process.env.PORT


// Initialize the Express application
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(responseHandler);

// Health check endpoint
app.get('/', (req, res) => {
    res.send("API is healthy");
})

// Define application routes
app.use("/api/auth", authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Use the error handling middleware
app.use(errorHandler);

// Global error handlers
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
})