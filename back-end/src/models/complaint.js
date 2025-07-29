import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  image: String,
  reasons: [String],
  description: String,
  isTrue: Boolean,
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
