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

const app = express();
const port = 3000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());  

// Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions })); 
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter )
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)

// Webhook Route
// app.post('/webhook', async (req, res) => {
//   const { body } = req;
//   console.log('Webhook received:', body);

//   // Handle 'user.created' event from Clerk
//   if (body?.type === 'user.created') {
//     const { id, email, firstName, lastName, imageUrl } = body.data;

//     // Save user to MongoDB
//     const newUser = new User({
//       _id: id,
//       name: `${firstName} ${lastName}`,
//       email: email,
//       image: imageUrl,
//     });

//     try {
//       await newUser.save();
//       res.status(200).send('User created successfully');
//     } catch (err) {
//       res.status(500).send('Error saving user: ' + err.message);
//     }
//   } else {
//     res.status(200).send('Event type not handled');
//   }
// });

// Start server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
