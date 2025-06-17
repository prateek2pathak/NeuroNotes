import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const database_uri = process.env.DATABASE_URI;

const connectDB = async()=>{
    try {
        await mongoose.connect(database_uri);
        console.log("Database connect successfully!");
    } catch (error) {
        console.log("Error in connecting to database ",error);
    }
}

export default connectDB;