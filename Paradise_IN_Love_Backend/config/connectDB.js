import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


if (!process.env.MONGODB_URI) {
    throw new Error(
        "Please Provide MongoDB Uri in the .env File"
    )
}


async function connectDB() {
try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connect DB");
    
} catch (error) {
    console.log("MongoDb Coonection Error", error);
    process.exit(1);
    
}

}


export default connectDB;