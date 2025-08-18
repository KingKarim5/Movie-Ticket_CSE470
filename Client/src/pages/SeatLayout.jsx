import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import ISOTimeFormat from '../libraries/ISOTimeformat'; 
import Blurcircle from '../components/Blurcircle';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { t } from '../libraries/i18n';

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"], // First 2 rows
    ["C", "D"], // Row C and D as a pair
    ["E", "F"], // Row E and F as a pair
    ["G", "H"], // Row G and H as a pair
    ["I", "J"], // Row I and J as a pair
  ]; // Row groups: A+B, C+D, E+F, G+H, I+J

  const { id, date } = useParams(); 
  const [selectedSeats, setSelectedSeats] = useState([]); 
  const [selectedTime, setSelectedTime] = useState(null); 
  const [show, setShow] = useState(null); 
  const navigate = useNavigate(); // Used for navigation

  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id); 
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast(t('pleaseSelectTime'));
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 4) {
      return toast(t('maxSeatsReached'));
    }
    setSelectedSeats(prev => {
      return prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId) // Remove seat if already selected
        : [...prev, seatId]; // Add seat if not already selected
    });
  };

  // Function to render seats in rows
  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}-${i + 1}`;  // Fixed template literal for seatId
          return (
            <button 
              key={seatId} 
              onClick={() => handleSeatClick(seatId)} 
              className={`h-8 w-8 rounded border border-purple-600 cursor-pointer 
                ${selectedSeats.includes(seatId) && "bg-purple-600 text-white"}`} // Fixed className syntax
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleCheckout = () => {
    if (!selectedTime) {
      return toast.error(t('pleaseSelectTime'));
    }
    if (selectedSeats.length === 0) {
      return toast.error('Please select at least one seat');
    }

    // Save selected seats and time to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('selectedTime', JSON.stringify(selectedTime));
    
    // Navigate to checkout page
    navigate(`/checkout/${id}/${date}`);
  };

  if (!show) {
    return <div className="flex items-center justify-center min-h-screen text-2xl text-white">{t('loading')}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 bg-black text-white">
      {/* Timings */}
      <div className="w-60 bg-black text-white border border-purple-500 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">{t('availableTimings')}</p>
        <div>
          {show.dateTime[date]?.map((time, index) => (
            <div
              key={index}
              onClick={() => handleTimeSelect(time)} 
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-md cursor-pointer transition 
                ${selectedTime?.time === time.time 
                  ? 'bg-purple-700 text-white' 
                  : 'hover:bg-purple-600 hover:text-white'}`}
            >
              <ClockIcon className="w-5 h-5" />
              <p className="text-sm">{ISOTimeFormat(time.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <Blurcircle top="-100px" left="-100px" />
        <Blurcircle bottom="0px" right="0px" />
        <h1 className="text-2xl font-semibold mb-4">{t('selectSeats')}</h1>
        <img src={assets.screenImage} alt="screen" className="w-full max-w-lg" />
        <p className="text-gray-400 text-sm mb-6">{t('selectYourPreferredSeats')}</p>

        {/* Render Seats */}
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          {/* Render A and B Rows */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row, 9))}
          </div>

          {/* Render other rows (C, D), (E, F), (G, H), (I, J) as pairs */}
          {groupRows.slice(1).map((group, idx) => (
            <div key={idx} className="flex justify-between gap-6 mb-6">
              {group.map((row) => renderSeats(row, 9))} {/* 9 seats for each row */}
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Button (Positioned Horizontally) */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={handleCheckout}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white py-1 px-4 rounded-md text-sm mx-auto hover:bg-red-600 transition-colors duration-300"
        >
          {t('proceedToCheckout')}
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
