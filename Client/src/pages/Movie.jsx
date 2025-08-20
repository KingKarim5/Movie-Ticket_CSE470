import React from 'react';
import Blurcircle from '../components/Blurcircle';
import MovieCard from '../components/moviecard';
import { useAppContext } from '../context/Appcontext';

const Movies = () => {
  const{ shows } = useAppContext()

  return shows.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh] bg-black text-white">
      {/* Purple glow effects */}
      <Blurcircle top="150px" left="0px" color="purple" />
      <Blurcircle bottom="50px" right="50px" color="purple" />

      <h1 className="text-4xl font-bold text-center text-purple-400 mb-8 font-cursive italic tracking-wide shadow-lg uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
        Now Showing
      </h1>

      <div className="flex flex-wrap max-sm:justify-center gap-4">
        {shows.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
        Unavailable
      </h1>
    </div>
  );
};

export default Movies;
