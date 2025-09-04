import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {type: String, required: true, ref: 'User'},
    show: {type: String,required: true, ref: 'Show'},
    amount: {type: Number,required:true},
    finalAmount: { type: Number },
    discount: { type: Number, default: 0 },
    promoCode: { type: String },
    bookedseats: {type: Array,required: true},
    isPaid: { type : Boolean, default: false},
    paymentLink : {type : String},
    status: { type: String, enum: ['pending', 'paid', 'cancelled', 'expired'], default: 'pending' },
    expiresAt: { type: Date }
},{timestamps:true});

export default mongoose.model('Booking', bookingSchema); 