import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/Database.js'; 
import { clerkMiddleware } from '@clerk/express'; 
// import User from './models/User.js'; 
import { inngest, functions } from './Inngest/Ind.js';
import { serve } from 'inngest/express'; 
import showRouter from './Routes/Show routes.js'; 
import bookingRouter from './Routes/booking routes.js';
import adminRouter from './Routes/Admin routes.js';
import userRouter from './Routes/User routes.js';
import authRouter from './Routes/Auth routes.js';

const app = express();
const port = 3000;

// Connect to MongoDB
await connectDB();


// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY
}));

// Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions })); 
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter )
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)
app.use('/api/auth', authRouter)

// Start server
app.listen(port, () => console.log(`Server is listening here at http://localhost:${port}`));
