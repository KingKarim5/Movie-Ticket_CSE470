import { clerkClient } from "@clerk/express";
import 'dotenv/config';

// Script to make a specific user admin
const makeSpecificUserAdmin = async () => {
    try {
        console.log('🔍 Making specific user admin...');
        
        // Get all users
        const userList = await clerkClient.users.getUserList({
            limit: 50
        });
        const users = userList.data;
        
        if (users.length === 0) {
            console.log('No users found.');
            return;
        }
        
        // Find the user by email
        const targetEmail = 'naushadkhon17@gmail.com'; // Change this to your email
        const targetUser = users.find(user => 
            user.emailAddresses.some(email => email.emailAddress === targetEmail)
        );
        
        if (!targetUser) {
            console.log(`User with email ${targetEmail} not found.`);
            console.log('Available users:');
            users.forEach(user => {
                console.log(`- ${user.emailAddresses[0]?.emailAddress}`);
            });
            return;
        }
        
        console.log(`Making ${targetEmail} admin...`);
        
        await clerkClient.users.updateUser(targetUser.id, {
            privateMetadata: { role: 'admin' }
        });
        
        console.log('✅ User made admin successfully!');
        
    } catch (error) {
        console.error('❌ Error making user admin:', error.message);
    }
};

makeSpecificUserAdmin();

