import express from 'express';
import { protectAdmin } from '../middleware/auth.js';
import { addshow, getnowplayingMovies, getShow, getShows } from '../controller/showcontroller.js';

const showRouter = express.Router();

// Define the route and associate it with the controller function
showRouter.get('/now-playing', protectAdmin, getnowplayingMovies);
showRouter.get('/now- playing', protectAdmin, getnowplayingMovies); // alias to tolerate stray whitespace
showRouter.post('/add', protectAdmin, addshow);
showRouter.get('/all', getShows);
showRouter.get('/:movieID', getShow)

export default showRouter;
