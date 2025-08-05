import React from 'react';
import Navbar from './components/NavBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import Favourite from './pages/Favourite';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { Layout } from 'lucide-react';

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
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/favourite" element={<Favourite />} /> 
        <Route path='/admin/*' element={<Layout/>}>
         <Route index element ={<Admin_Das/>}/>
         <Route index element ={<Admin_Das/>}/>

        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
