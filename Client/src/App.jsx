import React from 'react';
import Navbar from './components/NavBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import Favourite from './pages/Favourite';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
// Import admin components
import Layout from './pages/ADMIN/Layout';
import Admin_Das from './pages/ADMIN/Admin_Das';
import List_Books from './pages/ADMIN/List_Books';
import List_Shows from './pages/ADMIN/List_Shows';
import Admin_Add_Shows from './pages/ADMIN/Admin_Add_Shows';

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  
  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/checkout/:id/:date" element={<Checkout />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/favourite" element={<Favourite />} /> 
        {/* Admin routes */}
        <Route path='/admin' element={<Layout/>}>
          <Route index element={<Admin_Das />} />
          <Route path="bookings" element={<List_Books />} />
          <Route path="shows" element={<List_Shows />} />
          <Route path="add-show" element={<Admin_Add_Shows />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
