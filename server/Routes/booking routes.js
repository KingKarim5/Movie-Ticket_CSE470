import express from "express";
import { createBooking, getoccupiedSeats } from "../controller/bookingcontroller.js";

const bookingRouter = express.Router();


bookingRouter.post('/create', createBooking)
// use a route param for showId
bookingRouter.get('/seats/:showId', getoccupiedSeats)

export default bookingRouter;