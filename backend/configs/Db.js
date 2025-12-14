import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connection Success: ", conn.connection.host)
    } catch (error) {
        console.log("Connection to Database failed", error)
    }
}


export default connectDB