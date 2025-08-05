import axios from "axios";
import Show from "../models/Show.js"; // Assuming you have a Show model

export const getNowPlayingShows = async (req, res) => {
  try {
    const shows = await Show.find({ status: 'now_playing' });

    // Fetching additional movie details from OMDb API
    const moviePromises = shows.map(async (show) => {
      const movieId = show.movie; // Assuming 'movie' is an IMDb ID
      const movieData = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${process.env.OMDB_API_KEY}`);
      return { show, movieDetails: movieData.data }; // Combine show data with movie data
    });

    const showsWithMovieData = await Promise.all(moviePromises); // Wait for all promises to resolve

    res.status(200).json(showsWithMovieData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shows and movie details', error });
  }
};
