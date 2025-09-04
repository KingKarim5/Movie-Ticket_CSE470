import React from 'react';
import Blurcircle from '../components/Blurcircle';
import MovieCard from '../components/moviecard';
import { useAppContext } from '../context/Appcontext';

const Favourite = () => {
  const { favoriteMovies, image_base_url } = useAppContext()
  
  // Add safety check for undefined favoriteMovies
  if (!favoriteMovies) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
          Loading...
        </h1>
      </div>
    );
  }
  
  return favoriteMovies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh] bg-black text-white">
      <Blurcircle top="150px" left="0px" color="purple" />
      <Blurcircle bottom="50px" right="50px" color="purple" />

      <h1 className="text-4xl font-bold text-center text-purple-400 mb-8 font-cursive italic tracking-wide shadow-lg uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
        Your Favourites
      </h1>

      <div className="flex flex-wrap max-sm:justify-center gap-4">
        {favoriteMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
        No favourite movies available.
      </h1>
      <p className="text-gray-400">Add some movies to your favorites to see them here!</p>
    </div>
  );
};

export default Favourite;
