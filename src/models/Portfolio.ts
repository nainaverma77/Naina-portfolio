import mongoose, { Schema } from 'mongoose';

const PortfolioSchema = new Schema({
  data: { type: Schema.Types.Mixed, required: true, default: {} }
}, { timestamps: true });

export const PortfolioModel = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
