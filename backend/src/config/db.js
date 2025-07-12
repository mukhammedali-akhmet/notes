import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("success")
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
} 