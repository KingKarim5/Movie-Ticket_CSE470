import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: { type: String, required: true, ref: 'Movie' }, // Fixed typo "mvoie" to "movie"
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, default: {} } // Fixed default value syntax
  },
  { minimize: false }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
