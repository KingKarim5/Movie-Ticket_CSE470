import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Blurcircle from '../components/Blurcircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../libraries/timeformat';
import Selectdate from '../components/Selectdate';
import Loading from '../components/loading'; // Corrected import

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

  const getShow = () => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    } else {
      console.error('No show found with the given ID');
      setShow(null);
    }
  };

  // Get recommended movies based on genre
  const getRecommendedMovies = () => {
    if (show) {
      return dummyShowsData.filter(
        (movie) => movie._id !== id && movie.genres.some((genre) => 
          show.movie.genres.map((g) => g.name).includes(genre.name)
        )
      );
    }
    return [];
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (show === null) {
    return <Loading />; // Render the Loading component when no show is found
  }

  const recommendedMovies = getRecommendedMovies();

  const handleBuyTicket = (movieId) => {
    navigate(`/movies/${movieId}`);
    scrollTo(0, 0); // Scroll to the top
  };

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt={`${show.movie.title} poster`}
          className="max-md:auto rounded-xl h-104 max-w-70 object-cover"
        />
        <div className="relative flex flex-col gap-3">
          <Blurcircle top="-100px" left="-100px" />
          <p className="text-primary">English</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>
          <p>
            {timeFormat(show.movie.runtime)} |{' '}
            {show.movie.genres.map((genre) => genre.name).join(' , ')} |{' '}
            {new Date(show.movie.release_date.split('-')[0]).getFullYear()}
          </p>
          <div className="flex items-center gap-x-4">
            <button className="flex items-center gap-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              href="#selectdate"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                const section = document.getElementById('selectdate');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition inline-flex items-center"
            >
              Buy Ticket
            </a>
            <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <p>Your Favourite Casts</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Selectdate dateTime={show.dateTime} id={id} />

      {/* Recommended Movies Section */}
      {recommendedMovies.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white">You May Also Like</h2> {/* Updated text color to white */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {recommendedMovies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-xl">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="rounded-xl h-52 w-full object-cover"
                />
                <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-500 text-sm">{movie.genres.map((genre) => genre.name).join(', ')}</p>

                {/* Movie actions */}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => handleBuyTicket(movie.id)}
                    className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 transition-all cursor-pointer"
                  >
                    Buy Ticket
                  </button>
                  <button className="text-yellow-400 hover:text-yellow-500">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loading /> // Use the Loading component for the loading state or no movie found
  );
};

export default MovieDetails;
