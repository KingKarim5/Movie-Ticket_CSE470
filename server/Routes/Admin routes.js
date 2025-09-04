import express from 'express'
import { adminDashboarddata, getallshows, getbookings, isAdmin, makeUserAdmin, removeUserAdmin, createPromo, listPromos, togglePromo } from '../controller/admincontroller.js';
import { protectAdmin, protectUser } from '../middleware/auth.js';
// import { protectAdmin } from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.get('/is-admin',protectUser, isAdmin )
adminRouter.get('/dashboard', protectAdmin, adminDashboarddata)
adminRouter.get('/all-shows', protectAdmin, getallshows)
adminRouter.get('/all-bookings', protectAdmin, getbookings)
adminRouter.post('/make-admin', protectAdmin, makeUserAdmin)
adminRouter.post('/remove-admin', protectAdmin, removeUserAdmin)
// Promo code routes
adminRouter.post('/promos', protectAdmin, createPromo)
adminRouter.get('/promos', protectAdmin, listPromos)
adminRouter.patch('/promos/:id/toggle', protectAdmin, togglePromo)

export default adminRouter;