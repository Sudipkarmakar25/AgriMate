import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set. Skipping DB connection.');
    return;
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};
