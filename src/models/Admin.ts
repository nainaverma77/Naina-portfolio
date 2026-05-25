import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }, // securely hashed password
  email: { type: String, required: false },    // optional routing email for OTP
  role: { type: String, enum: ['admin', 'master'], default: 'admin' }
}, { timestamps: true });

export const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
