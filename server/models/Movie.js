import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Align schema with fields created in addshow controller
const movieSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    poster_path: { type: String, required: true },
    backdrop_path: { type: String, required: true },
    releaseDate: { type: String, required: true },
    original_language: { type: Array, default: [] },
    tagline: { type: String, default: '' },
    vote_average: { type: Number, default: 0 },
    genres: { type: Array, required: true },
    casts: { type: Array, required: true },
    runtime: { type: Number }
}, { timestamps: true })

export default mongoose.model('Movie', movieSchema);
