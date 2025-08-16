import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  type: { type: String, enum: ['note', 'assignment', 'diary'], required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  dueDate: { type: Date }, // for assignments
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Entry', entrySchema);
