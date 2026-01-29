import mongoose, { Mongoose } from "mongoose";

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Define the type for our cached connection
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global object to include our mongoose cache
// This prevents TypeScript errors when accessing global.mongoose
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize the cached connection object
// In development, we store it on the global object to preserve it across hot reloads
// This prevents creating multiple connections during development
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Store the cache on the global object for development
if (process.env.NODE_ENV !== "production") {
  global.mongoose = cached;
}

/**
 * Connects to MongoDB using Mongoose with connection caching.
 *
 * In development, Next.js clears Node.js cache on every request,
 * which would create a new database connection each time.
 * By caching the connection on the global object, we reuse the
 * existing connection and avoid connection exhaustion.
 *
 * @returns Promise<Mongoose> - The Mongoose connection instance
 * @throws Error if MONGODB_URI is not defined
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // Validate that MONGODB_URI is defined
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable in .env"
    );
  }

  // If we already have a connection, return it
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // If no existing promise, create a new connection
  if (!cached.promise) {
    // Mongoose connection options for optimal performance
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable buffering for faster error handling
    };

    console.log("Establishing new MongoDB connection...");

    // Create the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
  } catch (error) {
    // Reset the promise on error so we can retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;

