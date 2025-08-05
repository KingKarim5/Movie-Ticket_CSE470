import React from 'react';
import movifyLogo from '../assets/movifylogo.png'; // Adjust path/extension if needed

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="mb-4 md:mb-0 flex items-center">
          <img
            src={movifyLogo}
            alt="Movify Logo"
            style={{ width: 48, height: 48, objectFit: 'contain' }}
            className="mr-3"
          />
          <div>
            <span className="font-bold text-lg">Movify</span>
            <span className="ml-2 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</span>
            <div className="mt-2 text-xs text-gray-400">
              <div style={{ fontStyle: 'italic' }}>Kingkarim Productions</div>
              <div style={{ fontStyle: 'italic' }}>Headoffice</div>
              <div style={{ fontStyle: 'italic' }}>Mirpur 2, Dhaka 1216</div>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="/" className="hover:text-primary transition">Home</a>
          <a href="/movie" className="hover:text-primary transition">Movies</a>
          <a href="/favourite" className="hover:text-primary transition">Favourites</a>
          <a href="mailto:support@movieticket.com" className="hover:text-primary transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;