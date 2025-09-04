import { CalculatorIcon, ClockIcon, SearchIcon, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // ensure path is correct

const Herosec = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/Fantastic_4.jpg")' }}
    >
      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full">
        <h1 className="text-5xl md:text-[70px] leading-tight font-bold text-white drop-shadow-lg">
          Fantastic 4
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-purple-300">
          <span>Action | Adventure | Sci-Fi</span>
          <div className="flex items-center gap-1">
            <CalculatorIcon className="w-4.5 h-4.5" /> 2025
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4.5 h-4.5" /> 1h 55min
          </div>
        </div>

        <p className="max-w-md text-gray-300 italic">
          In a world where science meets disaster, four individuals gain incredible powers after a catastrophic event. Together, they must fight to stop a villain who threatens the very existence of humanity.
        </p>

        <div className="mt-4 text-white">
          <span className="text-lg font-medium">Live in theatres near you</span>
        </div>

        {/* Example movie card with gradient border */}
        <div className="mt-6 p-[2px] rounded-xl bg-gradient-to-r from-purple-700 via-black to-purple-700 shadow-lg w-40">
          <img
            src="/Fantastic_4.jpg"
            alt="Fantastic 4"
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-5 py-3 text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-400 hover:to-red-400 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            <SearchIcon className="w-5 h-5" />
            Search Movies
          </button>
          <Link
            to="/mybookings"
            className="flex items-center gap-2 px-5 py-3 text-white bg-red-600 hover:bg-red-700 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 border border-white/10 backdrop-blur-sm"
            aria-label="Open cart / my bookings"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Herosec;
