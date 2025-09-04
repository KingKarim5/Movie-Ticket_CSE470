import mongoose from "mongoose";

const connectDB = async() => {
    try {
        mongoose.connection.on('connected', () => console.log("Connected to mongoDB atlas!"));  
        
        // Add proper connection options to prevent timeouts
        const options = {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        
        await mongoose.connect(`${process.env.MONGO_URI}`, options);
    } catch (error) {
        console.log("Database connection error:", error.message);
        process.exit(1); // Exit if database connection fails
    }
}

export default connectDB;