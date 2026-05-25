import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true }
}, { timestamps: true });

export const MessageModel = mongoose.models.Message || mongoose.model('Message', MessageSchema);
