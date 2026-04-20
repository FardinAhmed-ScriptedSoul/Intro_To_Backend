import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

//connecting to the database

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: DB_NAME
        });
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;