import express from "express";
import { Favourite_update, getfavorites, getUserbookings } from "../controller/user controller.js";
import { protectUser } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.get('/bookings', protectUser, getUserbookings );
userRouter.post('/update-favorites', protectUser, Favourite_update );
userRouter.get('/favorites', protectUser, getfavorites );

export default userRouter;

