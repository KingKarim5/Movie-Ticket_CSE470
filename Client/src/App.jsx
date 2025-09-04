import React from 'react';
import Navbar from './components/NavBar';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import Favourite from './pages/Favourite';
import Payment from './pages/Payment';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
// Import admin components
import Layout from './pages/ADMIN/Layout';
import Admin_Das from './pages/ADMIN/Admin_Das';
import List_Books from './pages/ADMIN/List_Books';
import List_Shows from './pages/ADMIN/List_Shows';
import Admin_Add_Shows from './pages/ADMIN/Admin_Add_Shows';
import Admin_Promos from './pages/ADMIN/Admin_Promos';
import { useAppContext } from './context/Appcontext';
import { SignIn } from '@clerk/clerk-react';

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  const { user } = useAppContext()
  
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
        <Route path="/pay/:bookingId" element={<Payment />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/my-bookings" element={<Navigate to="/MyBookings" replace />} />
        <Route path="/favourite" element={<Favourite />} /> 
        <Route path='/admin/*' element={user ? <Layout/> : (
            <div className='min-h-screen flex justify-center items-center'>
              <SignIn fallbackRedirectUrl={'/admin'}/>
            </div>
          )
        }>
          <Route index element={<Admin_Das />} />
          <Route path="bookings" element={<List_Books />} />
          <Route path="shows" element={<List_Shows />} />
          <Route path="add-show" element={<Admin_Add_Shows />} />
          <Route path="promos" element={<Admin_Promos />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
