import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
});

// If you want to use a custom type for _id (like a string instead of the default ObjectId)
userSchema._id = { type: String, required: true };

const User = mongoose.model('User', userSchema);

export default User;
