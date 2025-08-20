import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

// API call to get user bookings
export const getUserbookings = async (req, res) => {
    try {
        const user = req.auth().userId;
        const bookings = await Booking.find({ user }).populate({
            path: 'show',
            populate: {
                path: 'movie'
            }
        }).sort({ createdAt: -1 })
        res.json({ success: true, bookings })
    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message });
    }
}
//API func to store user fav movie
export const Favourite_update = async (req, res) => {
    try {
        const { movieId } = req.body
        const userId  = req.auth().userId;
        const user = await clerkClient.users.getUser(userId);
        
        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites =[]
        }
        if (!user.privateMetadata.favorites.includes(movieId)){
            user.privateMetadata.favorites.push(movieId)
        }else{
            user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId)
        }

        await clerkClient.users.updateUserMetadata(userId,{privateMetadata: user.privateMetadata})

        res.json({success: true, message: "Favourite movie updated successfully"});

    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message });
    }
}

//func to see the fav movies list
export const getfavorites = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const user = await clerkClient.users.getUser(userId);
        const favorites = user.privateMetadata.favorites;

        //Getting movies from the database
        const movies = await Movie.find({_id: {$in : favorites}});
        res.json({success: true, movies});
    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message });
    }
}