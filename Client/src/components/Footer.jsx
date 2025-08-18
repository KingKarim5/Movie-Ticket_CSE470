import React from 'react';
import movifyLogo from '../assets/movifylogo.png'; // Adjust path/extension if needed

const Footer = () => {
  return (
    <footer className="relative py-6 mt-10 text-gray-300 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Elegant top gradient border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500" />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 relative z-10">
        {/* Logo & Info */}
        <div className="mb-4 md:mb-0 flex items-center">
          <img
            src={movifyLogo}
            alt="Movify Logo"
            style={{ width: 48, height: 48, objectFit: 'contain' }}
            className="mr-3 drop-shadow-lg"
          />
          <div>
            <span className="font-bold text-lg text-white">Movify</span>
            <span className="ml-2 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
            <div className="mt-2 text-xs text-gray-400 space-y-1">
              <div className="italic">Kingkarim Productions</div>
              <div className="italic">Headoffice</div>
              <div className="italic">Mirpur 2, Dhaka 1216</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          {[
            { label: 'Home', href: '/' },
            { label: 'Movies', href: '/movie' },
            { label: 'Favourites', href: '/favourite' },
            { label: 'Contact', href: 'mailto:support@movieticket.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative group font-medium"
            >
              <span className="transition-colors duration-300 group-hover:text-white">
                {link.label}
              </span>
              {/* Underline on hover */}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
