import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import PromoCode from "../models/PromoCode.js";
import User from "../models/User.js";
import mongoose from 'mongoose';
import { clerkClient } from "@clerk/express";

// Check the user is admin or not
export const isAdmin = async(req,res) => {
    try {
        const { userId } = req.auth();
        const user = await clerkClient.users.getUser(userId);
        const isUserAdmin = user.privateMetadata?.role === 'admin';
        return res.json({ success: true, isAdmin: isUserAdmin });
    } catch (error) {
        return res.json({ success: false, isAdmin: false, message: error.message });
    }
}

// Make a user admin (requires super admin privileges)
export const makeUserAdmin = async(req,res) => {
    try {
        // With local auth, promotion endpoint is optional; not used
        return res.status(501).json({success:false, message:'Not implemented in local auth'});
    } catch (error) {
        console.error('Make admin error:', error);
        return res.status(500).json({success: false, message: error.message});
    }
}

// Remove admin privileges
export const removeUserAdmin = async(req,res) => {
    try {
        return res.status(501).json({success:false, message:'Not implemented in local auth'});
    } catch (error) {
        console.error('Remove admin error:', error);
        return res.status(500).json({success: false, message: error.message});
    }
}
// API to get dashboard data
export const adminDashboarddata = async(req,res) => {
      try {
          // Use Promise.all to run queries in parallel for better performance
          const [bookings, activeshows, totalUsers] = await Promise.all([
              Booking.find({isPaid:true}).lean(),
              Show.find({showDateTime : {$gte : new Date()}}).populate('movie').lean(),
              mongoose.connection.client.db('test').collection('users').countDocuments()
          ]);
          
          const dashboarddata = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + (booking.finalAmount ?? booking.amount) , 0),
            activeShows: activeshows.map(show => ({
              _id: show._id,
              movie: show.movie,
              showDateTime: show.showDateTime,
              showPrice: show.showprice
            })),
            totalUser: totalUsers
          }
        res.json({success: true, dashboarddata})
      } catch (error) {
        console.error('Dashboard error:', error)
        res.status(500).json({success: false, message: error.message});
      }
}
// API to get all shows
export const getallshows = async(req,res) => {
   try {
        const showdata = await Show.find({showDateTime : { $gte : new Date()}})
            .populate('movie')
            .sort({showDateTime : 1})
            .lean();
        res.json({success: true, showdata});
   } catch (error) {
        console.error('Get all shows error:', error)
        res.status(500).json({success: false, message: error.message});
    }
}

export const getbookings = async(req,res) => {
    try {
        const bookings = await Booking.find({})
            .populate('user')
            .populate({
                path: 'show',
                populate : {
                    path: "movie"
                }
            })
            .sort({createdAt : -1})
            .lean();
        res.json({success: true, bookings})
    } catch (error) {
        console.error('Get bookings error:', error)
        res.status(500).json({success: false, message: error.message});
    }
}

// Promo code admin APIs
export const createPromo = async (req, res) => {
  try {
    const { code, type, value, maxDiscount, minAmount, validFrom, validTo, usageLimit, isActive } = req.body;
    const promo = await PromoCode.create({
      code: String(code).toUpperCase(),
      type,
      value,
      maxDiscount,
      minAmount,
      validFrom,
      validTo,
      usageLimit,
      isActive: isActive ?? true
    });
    res.json({ success: true, promo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const listPromos = async (req, res) => {
  try {
    const promos = await PromoCode.find({}).sort({ createdAt: -1 }).lean();
    res.json({ success: true, promos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const togglePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await PromoCode.findById(id);
    if (!promo) return res.status(404).json({ success: false, message: 'Not found' });
    promo.isActive = !promo.isActive;
    await promo.save();
    res.json({ success: true, promo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}