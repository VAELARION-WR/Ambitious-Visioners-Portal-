import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not set');
  process.exit(1);
}

mongoose.set('strictQuery', true);
mongoose.connect(uri, { dbName: 'avp' })
  .then(() => console.log('MongoDB connected'))
  .catch((e) => {
    console.error('MongoDB connection error', e);
    process.exit(1);
  });
