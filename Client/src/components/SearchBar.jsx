import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, XIcon, FilmIcon, StarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyShowsData } from '../assets/assets';
import { t } from '../libraries/i18n';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const titleMatches = dummyShowsData.filter(movie =>
      movie.title.toLowerCase().includes(lowerQuery)
    );

    const genreMatches = dummyShowsData.filter(movie =>
      movie.genres.some(genre => genre.name.toLowerCase().includes(lowerQuery))
    );

    const castMatches = dummyShowsData.filter(movie =>
      movie.casts.slice(0, 3).some(cast => cast.name.toLowerCase().includes(lowerQuery))
    );

    const allMatches = [...titleMatches, ...genreMatches, ...castMatches];
    const uniqueMatches = allMatches.filter(
      (movie, index, self) => index === self.findIndex(m => m._id === movie._id)
    );

    const sortedMatches = uniqueMatches.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(lowerQuery);
      const bTitleMatch = b.title.toLowerCase().includes(lowerQuery);

      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;

      return a.title.localeCompare(b.title);
    });

    setSuggestions(sortedMatches.slice(0, 6));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateSuggestions(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (movie) => {
    navigate(`/movies/${movie._id}`);
    setSearchQuery('');
    setShowSuggestions(false);
    onClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-purple-500 text-black font-semibold px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-center pt-20 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div ref={searchRef} className="w-full max-w-2xl mx-4">
        <div className="bg-gradient-to-br from-black via-purple-950 to-black rounded-lg shadow-2xl border border-purple-800">
          {/* Search Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-800">
            <h3 className="text-lg font-semibold text-purple-300">{t('search')}</h3>
            <button
              onClick={onClose}
              className="text-purple-400 hover:text-purple-200 transition"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-3 bg-black text-white placeholder-gray-400 border border-purple-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="max-h-96 overflow-y-auto border-t border-purple-800">
              {suggestions.map((movie) => (
                <div
                  key={movie._id}
                  onClick={() => handleSuggestionClick(movie)}
                  className="flex items-center p-4 hover:bg-purple-900/30 cursor-pointer border-b border-purple-800 last:border-b-0"
                >
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded mr-4 border border-purple-700"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">
                      {highlightMatch(movie.title, searchQuery)}
                    </h4>
                    <p className="text-sm text-purple-300">
                      {movie.genres.map(genre => genre.name).join(', ')}
                    </p>
                    <div className="flex items-center mt-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-300">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <FilmIcon className="w-5 h-5 text-purple-400" />
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {showSuggestions && searchQuery && suggestions.length === 0 && (
            <div className="p-4 text-center text-purple-400">
              <FilmIcon className="w-12 h-12 mx-auto mb-2 text-purple-500" />
              <p>{t('noMoviesFound')} "{searchQuery}"</p>
              <p className="text-sm text-purple-300">
                {t('trySearchingBy')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
