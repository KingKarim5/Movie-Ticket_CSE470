import React from 'react';
import Blurcircle from '../components/Blurcircle';
import MovieCard from '../components/moviecard';
import { useAppContext } from '../context/Appcontext';

const Favourite = () => {
  const { favoritemovies } = useAppContext()
  return favoritemovies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <Blurcircle top="150px" left="0px" />
      <Blurcircle bottom="50px" right="50px" />

      <h1 className="text-4xl font-bold text-center text-red-500 mb-8 font-cursive italic tracking-wide shadow-lg uppercase">
        Your Favourites
      </h1>

      <div className="flex flex-wrap max-sm:justify-center gap-4">
        {dummyShowsData.map((movie, index) => (
          <div
            key={movie.id}
            className={`
              w-[220px] rounded-lg overflow-hidden pb-3
              ${index % 2 === 0 
                ? 'bg-gradient-to-br from-purple-900 to-black' 
                : 'bg-gradient-to-br from-black to-purple-800'
              }
              border border-purple-700 hover:-translate-y-1 transition-transform duration-300
              text-white shadow-lg
            `}
          >
            {/* Movie Poster */}
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="h-60 w-full object-cover"
            />

            {/* Title */}
            <p className="font-medium p-2 truncate">{movie.title}</p>

            {/* Optional Extra Info */}
            {movie.vote_average && (
              <div className="flex items-center justify-between px-2">
                <p className="text-sm text-gray-300 italic">
                  Rating: {movie.vote_average.toFixed(1)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-600">
      No favourite movies available.
    </div>
  );
};

export default Favourite;
