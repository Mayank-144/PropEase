import mongoose from 'mongoose';

/**
 * MongoDB Database Connection
 */

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB Disconnected');
  } catch (error) {
    console.error(`✗ Database Disconnection Error: ${error.message}`);
    process.exit(1);
  }
}
