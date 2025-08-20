import express from "express";
import { Favourite_update, getfavorites, getUserbookings } from "../controller/user controller.js";

const userRouter = express.Router();

userRouter.get('/userbookings',getUserbookings );
userRouter.post('/updatefavorites', Favourite_update );
userRouter.get('/getfavorites', getfavorites );

export default userRouter;

