import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

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
            bookedseats: selectedSeats
        })
        selectedSeats.map((seat) => {
            show.occupiedSeats[seat] = userId;
        })

        show.markModified('occupiedSeats');
        await show.save();

        // Stripe gateway
 

        res.json({ success: true, message: 'Booked Successfully'});
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message || 'Booking failed'});
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