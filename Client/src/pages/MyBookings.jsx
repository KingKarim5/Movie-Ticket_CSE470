import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Blurcircle from '../components/Blurcircle';
import { t } from '../libraries/i18n';
import { useAppContext } from '../context/Appcontext';

// Function to format runtime in hours and minutes
const formatRuntime = (runtimeInMinutes) => {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  return `${hours}${t('hours')} ${minutes}${t('minutes')}`;
};

// Date format function
export const Dateformat = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    minute: 'numeric',
  });
};

const MyBookings = () => {
  const currency = t('currency');
  const { axios, getToken, user, image_base_url} = useAppContext()
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/user/bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (user) {
      getMyBookings();
    }
  }, [user]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen text-2xl text-white">{t('loading')}</div>
  ) : (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] bg-black text-white'>
      <h1 className='text-4xl font-bold text-center text-purple-600 mb-8 font-cursive italic tracking-wide shadow-lg uppercase'>
        {t('myBookings')}
      </h1>
      {/* Display bookings here */}
      <div className="booking-list">
        {bookings.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row justify-between bg-black text-white border border-purple-600 rounded-lg mt-4 p-4 max-w-3xl'>
            <div className='flex flex-col md:flex-row'>
              <img 
                src={image_base_url + item.show.movie.poster_path} 
                alt={item.show.movie.title} 
                className='md:max-w-[45%] aspect-video h-auto object-cover object-bottom rounded-md border-2 border-purple-600' 
              />
              <div className='flex flex-col p-4'>
                <p className='text-2xl font-semibold text-purple-400'>{item.show.movie.title}</p>
                <p className='text-purple-300 text-sm'>{formatRuntime(item.show.movie.runtime)}</p>
                <p className='text-purple-300 text-sm mt-auto'>{Dateformat(item.show.showDateTime)}</p>
                <p className='text-purple-300 text-sm'>{currency} {item.amount}</p>
                <p className='text-purple-200 text-sm'>{t('seatNumber')}: {Array.isArray(item.bookedseats) ? item.bookedseats.join(', ') : ''}</p>
              </div>
            </div>

            {/* Additional Information */}
            <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
              <div className='flex items-center gap-4'>
                <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
                {!item.isPaid && (
                  <button onClick={() => navigate(`/pay/${item._id}`)} className='bg-purple-600 text-white px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer hover:bg-red-600 transition-colors duration-300'>
                    {t('payNow')}
                  </button>
                )}
              </div>
              <div className='text-sm'>
                <p><span className='text-gray-400'>{t('totalTickets')}: </span>{Array.isArray(item.bookedseats) ? item.bookedseats.length : 0}</p>
                <p><span className='text-gray-400'>{t('seatNumber')}: </span>{Array.isArray(item.bookedseats) ? item.bookedseats.join(", ") : ''}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Blurcircle top="-100px" left="-100px" />
      <Blurcircle bottom="0px" right="0px" />
    </div>
  );
};

export default MyBookings;
