
import mongoose from 'mongoose';

let connectionPromise;

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .then((mongooseInstance) => {
        console.log('DB CONNECTED');
        return mongooseInstance.connection;
      })
      .catch((error) => {
        connectionPromise = undefined;
        console.error('MongoDB connection failed:', error.message);
        throw error;
      });
  }

  return connectionPromise;
};

export default connectDb;
