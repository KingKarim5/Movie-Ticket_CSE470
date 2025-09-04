import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import { clerkClient } from "@clerk/express";
import sendEmail from "../config/nodemailer.js";
import { inngest } from "../Inngest/Ind.js";
import { buildReceiptHtml } from "../utils/receiptTemplate.js";
import PromoCode from "../models/PromoCode.js";
import mongoose from "mongoose";

// To check the availability of selected seats
export const checkavailabilty = async (showId, selectedSeats) => {
    try {
        const showdata = await Show.findById(showId);
        if (!showdata) {
            return false;
        }
        const occupiedSeats = showdata.occupiedSeats;
        // if any selected seat exists in occupiedSeats, it's taken
        const isSeatTaken = selectedSeats.some((seat) => Boolean(occupiedSeats[seat]));

        return !isSeatTaken;
    } catch (error) {
        console.log(error);
        return false;
    }
}
// Create a booking for a specific show
export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;
        const origin = req.headers.origin;
        // Check if the seat is available for the selected show slot
        const isAvailable = await checkavailabilty(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({ success: false, message: "Selected seats are not available for booking" });
        }
        //To get the show details
        const show = await Show.findById(showId).populate('movie');
        //Creating new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: show.showprice * selectedSeats.length,
            bookedseats: selectedSeats,
            status: 'pending',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes hold
        })
        selectedSeats.map((seat) => {
            show.occupiedSeats[seat] = userId;
        })

        show.markModified('occupiedSeats');
        await show.save();

        // NOTE: Payment gateway integration placeholder.
        // Frontend will navigate to /pay/:bookingId to complete payment within 5 minutes.

        res.json({ success: true, message: 'Booking created. Complete payment within 5 minutes.', bookingId: booking._id });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message || 'Booking failed'});
    }
}

// Apply promo code to a pending booking
export const applyPromo = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ success: false, message: 'Promos are temporarily unavailable' });
        }
        const { userId } = req.auth();
        const { bookingId } = req.params;
        const { code } = req.body;
        if (!code) return res.status(400).json({ success: false, message: 'Code required' });

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.user !== userId) return res.status(404).json({ success: false, message: 'Booking not found' });
        if (booking.isPaid) return res.status(400).json({ success: false, message: 'Already paid' });

        const promo = await PromoCode.findOne({ code: code.toUpperCase(), isActive: true });
        if (!promo) return res.status(404).json({ success: false, message: 'Invalid promo code' });

        const now = new Date();
        if ((promo.validFrom && now < promo.validFrom) || (promo.validTo && now > promo.validTo)) {
            return res.status(400).json({ success: false, message: 'Promo not valid now' });
        }
        if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
            return res.status(400).json({ success: false, message: 'Promo usage limit reached' });
        }
        if (promo.minAmount && booking.amount < promo.minAmount) {
            return res.status(400).json({ success: false, message: `Minimum order BDT ${promo.minAmount}` });
        }

        let discount = 0;
        if (promo.type === 'percent') {
            discount = (booking.amount * promo.value) / 100;
            if (promo.maxDiscount) discount = Math.min(discount, promo.maxDiscount);
        } else {
            discount = promo.value;
        }

        const finalAmount = Math.max(0, booking.amount - discount);
        booking.discount = discount;
        booking.finalAmount = finalAmount;
        booking.promoCode = promo.code;
        await booking.save();

        res.json({ success: true, message: 'Promo applied', discount, finalAmount });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Public: list active promos (optionally filter by amount)
export const listActivePromos = async (req, res) => {
    try {
        // If DB is not connected, short-circuit to effectively disable promos
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, promos: [] });
        }
        const now = new Date();
        const amount = Number(req.query.amount || 0);
        const promos = await PromoCode.find({ isActive: true }).lean();
        const filtered = promos.filter(p => {
            if (p.validFrom && now < new Date(p.validFrom)) return false;
            if (p.validTo && now > new Date(p.validTo)) return false;
            if (p.usageLimit && (p.usedCount || 0) >= p.usageLimit) return false;
            if (amount && p.minAmount && amount < p.minAmount) return false;
            return true;
        });
        res.json({ success: true, promos: filtered });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Fetch a booking (for payment page)
export const getBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { bookingId } = req.params;
        const bookingDoc = await Booking.findById(bookingId);
        if (!bookingDoc || bookingDoc.user !== userId) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        // Backward compat: if unpaid and no expiresAt (older bookings), grant a fresh 5-min window
        if (!bookingDoc.isPaid && !bookingDoc.expiresAt) {
            bookingDoc.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
            await bookingDoc.save();
        }
        // auto-expire if past expiresAt and not paid: free seats and mark expired
        if (!bookingDoc.isPaid && bookingDoc.expiresAt && Date.now() > new Date(bookingDoc.expiresAt).getTime()) {
            const show = await Show.findById(bookingDoc.show);
            bookingDoc.bookedseats.forEach(seat => delete show.occupiedSeats[seat]);
            show.markModified('occupiedSeats');
            await show.save();
            bookingDoc.status = 'expired';
            await bookingDoc.save();
            return res.json({ success: false, expired: true, message: 'Booking expired' });
        }
        res.json({ success: true, booking: bookingDoc.toObject() });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Pay booking (simulate supported gateways: bkash, nagad, visa, mastercard)
export const payBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { bookingId } = req.params;
        const { method } = req.body; // 'bkash' | 'nagad' | 'visa' | 'mastercard'

        if (!['bkash', 'nagad', 'visa', 'mastercard'].includes(method)) {
            return res.status(400).json({ success: false, message: 'Unsupported payment method' });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.user !== userId) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        if (booking.isPaid) {
            return res.json({ success: true, message: 'Already paid' });
        }
        if (booking.expiresAt && Date.now() > new Date(booking.expiresAt).getTime()) {
            // free seats
            const show = await Show.findById(booking.show);
            booking.bookedseats.forEach(seat => delete show.occupiedSeats[seat]);
            show.markModified('occupiedSeats');
            await show.save();
            booking.status = 'expired';
            await booking.save();
            return res.status(410).json({ success: false, message: 'Booking expired' });
        }

        // Here you would call the payment provider SDK/API and verify payment
        // For now, simulate success
        booking.isPaid = true;
        booking.status = 'paid';
        await booking.save();

        // Emit event to Inngest to send email via the template in Ind.js
        try {
            await inngest.send({ name: 'app/show.booked', data: { bookingId: booking._id } });
        } catch (evtErr) {
            console.error('Failed to emit booking event:', evtErr?.message || evtErr);
        }

        res.json({ success: true, message: 'Payment successful' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Cancel booking (before paid or if within allowed policy)
export const cancelBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { bookingId } = req.params;
        const booking = await Booking.findById(bookingId);
        if (!booking || booking.user !== userId) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        if (booking.isPaid) {
            return res.status(400).json({ success: false, message: 'Paid bookings cannot be cancelled here' });
        }
        // free seats
        const show = await Show.findById(booking.show);
        booking.bookedseats.forEach(seat => delete show.occupiedSeats[seat]);
        show.markModified('occupiedSeats');
        await show.save();

        booking.status = (req.body && req.body.reason === 'expired') ? 'expired' : 'cancelled';
        await booking.save();

        res.json({ success: true, message: 'Booking cancelled' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
export const getoccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const showdata = await Show.findById(showId);
        const occupiedSeats = Object.keys(showdata.occupiedSeats);

        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}