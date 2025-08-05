// import React from 'react';
import { dummyShowsData } from '../assets/assets';
import Blurcircle from '../components/Blurcircle';
import MovieCard from '../components/moviecard';

const Movies = () => {
  return dummyShowsData.length > 0 ? (
      <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h[80vh]">
        <Blurcircle top="150px" left="0px" />
        <Blurcircle bottom="50px" right="50px" />
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8 font-cursive italic tracking-wide shadow-lg uppercase">Now Showing</h1>



        <div className="flex flex-wrap max-sm:justify center gap-4">
          {dummyShowsData.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Unavailable
      </h1>

    </div>
  );
};

export default Movies;
