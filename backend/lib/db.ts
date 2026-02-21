import mongoose from 'mongoose'

export const connectDB = async()=>{
  const DB_URI = process.env.DATABASE_URL as String;
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log(error);
  }
}