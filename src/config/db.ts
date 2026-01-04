import mongoose from 'mongoose';


// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        const mongo_uri = process.env.MONGO_URI;
        console.log("<======================================================>");
        
        console.log("🌍 MongoDB URI: ", mongo_uri);

        await mongoose.connect(process.env.MONGO_URI!)
        console.log('👌 MongoDB connected successfully');

        console.log("<======================================================>");
    } catch (error) {
        console.error("MongoDB error: ", error);
        process.exit(1);
    }
}