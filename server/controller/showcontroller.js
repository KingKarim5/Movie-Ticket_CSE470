import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import { inngest } from "../Inngest/Ind.js";

// API to get now playing movies from TMDB API
export const getnowplayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );
    const movies = data.results;
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to add a new show to the database
export const addshow = async (req, res) => {
  try {
    const { movieId, showsInput, showprice } = req.body;
    let movie = await Movie.findById(movieId);

    if (!movie) {
      // Getting movie details and credits (cast)
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
      ]);

      const moviedata = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: moviedata.title,
        overview: moviedata.overview,
        poster_path: moviedata.poster_path,
        backdrop_path: moviedata.backdrop_path,
        genres: moviedata.genres,
        casts: movieCreditsData.cast,
        releaseDate: moviedata.release_date,
        original_language: moviedata.spoken_languages,
        tagline: moviedata.tagline || "",
        vote_average: moviedata.vote_average,
        runtime: moviedata.runtime,
      };

      movie = await Movie.create(movieDetails);
    }

    const showstoCreate = [];
    showsInput.forEach((show) => {
      const showdate = show.date;
      show.time.forEach((time) => {
        const datetimeString = `${showdate}T${time}`;
        showstoCreate.push({
          movie: movieId,
          showDateTime: new Date(datetimeString),
          showprice,
          occupiedSeats: {},
        });
      });
    });

    if (showstoCreate.length > 0) {
      await Show.insertMany(showstoCreate);
    }

    await inngest.send({
      name: "app/show.added",
      data: { movieId: movie._id },
    });

    res.json({ success: true, message: "Show(s) added successfully." });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//API to get all shows 
export const getShows = async(req,res) =>{
  try{
    const shows = await Show.find({showDateTime : {$gte: new Date()}}).populate('movie').sort({showDateTime: 1 })

    //filter unique shows only
    const uniqueShows = new Set(shows.map(show => show.movie))

    res.json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message });
  }
}
//API for getting single shows
export const getShow = async (req,res) =>{
  try {
    const {movieID} = req.params;
    // get all upcoming shows for the movie
    const shows = await Show.find({ movie: movieID, showDateTime: { $gte: new Date() } }); 
    const movie = await Movie.findById(movieID);
    const datetime = {};
    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split('T')[0];
      if (!datetime[date]) {
        datetime[date] = [];
      }
      datetime[date].push({ time: show.showDateTime, showId: show._id })
    })
    res.json({ success: true, movie, datetime })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
