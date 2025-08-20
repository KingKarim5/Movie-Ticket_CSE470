import express from 'express'
import { adminDashboarddata, getallshows, getbookings, isAdmin } from '../controller/admincontroller.js';
import { protectAdmin } from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.get('/isAdmin',protectAdmin , isAdmin )
adminRouter.get('/dashboard', protectAdmin, adminDashboarddata)
adminRouter.get('/all-shows',protectAdmin,getallshows)
adminRouter.get('/all-bookings',protectAdmin, getbookings)

export default adminRouter;