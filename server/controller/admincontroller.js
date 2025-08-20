import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";

// Check the user is admin or not
export const isAdmin = async(req,res) => {
    // If protectAdmin passed, user is admin
    return res.json({success: true, isAdmin : true});
}
// API to get dashboard data
export const adminDashboarddata = async(req,res) => {
      try {
          const bookings = await Booking.find({isPaid:true});
          const activeshows = await Show.find({showDateTime : {$gte : new Date()}}).populate('movie');
          const totalUsers = await User.countDocuments();
          const dashboarddata = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount , 0),
            activeShows: activeshows.map(show => ({
              _id: show._id,
              movie: show.movie,
              showDateTime: show.showDateTime,
              showPrice: show.showprice
            })),
            totalUsers
          }
        res.json({success: true, dashboarddata})
      } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message});
      }
}
// API to get all shows
export const getallshows = async(req,res) => {
   try {
        const showdata = await Show.find({showDateTime : { $gte : new Date()}}).populate('movie').sort({showDateTime : 1});
        res.json({success: true, showdata});
   } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message});
    }
}

export const getbookings = async(req,res) => {
    try {
        const bookings = await Booking.find({}).populate('user').populate({
            path: 'show',
            populate : {
                path: "movie"
            }
        }).sort({createdAt : -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message});
    }
}