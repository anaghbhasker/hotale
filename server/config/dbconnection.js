import mongoose from "mongoose";

const connectDb=async(DATABASE_URL)=>{

    mongoose.set('strictQuery',false);
    try {
        const DB_OPTIONS={dbName:'hotale'}
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("Database connected...");
    } catch (error) {
        console.log(error);
    }

}

export default connectDb