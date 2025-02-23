// src/backend/config/db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI; // Ensure you have this in your .env.local

if (!MONGODB_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection
 * across hot reloads in development. This prevents
 * connections growing exponentially during API route hot reloads.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
    try {
        if (cached.conn) {
            return cached.conn;
        }
        if (!cached.promise) {
            // const opts = {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // };

            cached.promise = mongoose
                .connect(MONGODB_URI)
                .then((mongoose) => {
                    return mongoose;
                });
            console.log('Connected to MongoDB');
        }
        cached.conn = await cached.promise;
        console.log('Connected to MongoDB');
        return cached.conn;
    } catch (error) {
        console.log(error);
    }
}
