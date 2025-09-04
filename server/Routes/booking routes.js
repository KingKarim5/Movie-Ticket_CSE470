import express from "express";
import { createBooking, getoccupiedSeats, getBooking, payBooking, cancelBooking, applyPromo, listActivePromos } from "../controller/bookingcontroller.js";
import { protectUser } from "../middleware/auth.js";

const bookingRouter = express.Router();


bookingRouter.post('/create', protectUser, createBooking)
// use a route param for showId
bookingRouter.get('/seats/:showId', getoccupiedSeats)
bookingRouter.get('/:bookingId', protectUser, getBooking)
bookingRouter.post('/:bookingId/pay', protectUser, payBooking)
bookingRouter.post('/:bookingId/cancel', protectUser, cancelBooking)
bookingRouter.post('/:bookingId/apply-promo', protectUser, applyPromo)
bookingRouter.get('/promos/active', listActivePromos)

export default bookingRouter;