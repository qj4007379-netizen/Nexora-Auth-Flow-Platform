import { promises } from "dns";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    try {
        if (connection.isConnected) {
            console.log("Already connected to MongoDB");
            return;
        }

        const db = await mongoose.connect(process.env.MONGODB_URI || "", {
            bufferCommands: false,
        });

        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default dbConnect;