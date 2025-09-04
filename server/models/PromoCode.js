import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  type: { type: String, enum: ['percent', 'amount'], required: true },
  value: { type: Number, required: true },
  maxDiscount: { type: Number },
  minAmount: { type: Number, default: 0 },
  validFrom: { type: Date },
  validTo: { type: Date },
  usageLimit: { type: Number },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('PromoCode', promoCodeSchema);


