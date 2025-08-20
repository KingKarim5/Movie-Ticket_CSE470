import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon, XIcon, HomeIcon, Building2Icon, CalendarIcon, HeartIcon, TicketPlus } from 'lucide-react';
import React, { useState } from 'react';
import movifyLogo from '../assets/Movifylogo.png';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import SearchBar from './SearchBar';
import LanguageSelector from './LanguageSelector';
import { t } from '../libraries/i18n';
import { useAppContext } from '../context/Appcontext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const { favoriteMovies } = useAppContext()

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
        <Link to="/" className="max-md:flex-1">
          <div className="backdrop-blur-md bg-white/30 border border-red-500 rounded-lg p-1 shadow-md w-fit">
            <img
              src={movifyLogo}
              alt="Movify Logo"
              className="w-20 h-auto" // Changed from w-36 to w-20
              style={{ background: 'transparent' }}
            />
          </div>
        </Link>
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-red-500/40 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
        <XIcon className="md:hidden absolute top-6 right w-6 h-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/" className="text-black">{t('home')}</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/movie" className="text-black">{t('movie')}</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/" className="text-black">{t('theatres')}</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/" className="text-black">{t('releases')}</Link>
        {Array.isArray(favoriteMovies) && favoriteMovies.length > 0 && (
          <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/favourite" className="text-black">{t('favourites')}</Link>
        )}
        <SearchIcon 
          className="md:hidden w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" 
          onClick={() => {
            setIsSearchOpen(true);
            setIsOpen(false);
          }}
        />
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          <SearchIcon 
            className="max-md:hidden w-6 h-6 cursor-pointer hover:text-red-500 transition-colors" 
            onClick={() => setIsSearchOpen(true)}
          />
          {
            !user ? (
              <button onClick={openSignIn} className="px-4 py-1 sm:px-7 sm:py-2 bg-red-500/40 hover:bg-red-500/80 transition rounded-full font-medium cursor-pointer text-black">{t('login')}</button>
            ) : (
              <UserButton />
            )
          }
        </div>
        <MenuIcon className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Search Bar Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;


