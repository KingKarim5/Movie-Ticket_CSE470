import { clerkClient } from "@clerk/express";

// Middleware to protect user routes (any authenticated user)
export const protectUser = async(req,res,next) => {
    try {
        const {userId} = req.auth();
        const user = await clerkClient.users.getUser(userId);
        
        // Any authenticated user can access these routes
        next();
    } catch (error) {
        console.error('User auth error:', error);
        return res.status(403).json({success : false, message: "Not Authorized! Authentication failed."});
    }
}

// Middleware to protect admin routes
export const protectAdmin = async(req,res,next) => {
    try {
        const {userId} = req.auth();
        const user = await clerkClient.users.getUser(userId);
        
        // Check if user has admin role in private metadata
        if(user.privateMetadata.role !== 'admin') {
            return res.status(403).json({success : false, message: "Not Authorized! Admin role required."});
        }
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(403).json({success : false, message: "Not Authorized! Authentication failed."});
    }
}