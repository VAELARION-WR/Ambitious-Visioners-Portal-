import mongoose from 'mongoose';

const allowedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
}, { timestamps: true });

export default mongoose.model('AllowedEmail', allowedEmailSchema);
