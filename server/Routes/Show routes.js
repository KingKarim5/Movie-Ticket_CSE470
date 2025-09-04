import express from 'express';
//import { protectAdmin } from '../middleware/auth.js';
import { addshow, getnowplayingMovies, getShow, getShows, getAllShowsDebug, getTrailer } from '../controller/showcontroller.js';
import { protectAdmin } from '../middleware/auth.js';

const showRouter = express.Router();

// Define the route and associate it with the controller function
showRouter.get('/now-playing', protectAdmin, getnowplayingMovies);
showRouter.post('/add', protectAdmin, addshow);
showRouter.get('/all', getShows);
showRouter.get('/debug', getAllShowsDebug); // Debug endpoint
showRouter.get('/:movieID', getShow)
showRouter.get('/:movieID/trailer', getTrailer)

export default showRouter;
