import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import ISOTimeFormat from '../libraries/ISOTimeformat'; 
import Blurcircle from '../components/Blurcircle';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { t } from '../libraries/i18n';
import { useAppContext } from '../context/Appcontext';

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
  const { id, date } = useParams(); 
  const navigate = useNavigate();
  const { axios, getToken, user } = useAppContext();

  const [selectedSeats, setSelectedSeats] = useState([]); 
  const [selectedTime, setSelectedTime] = useState(null); 
  const [show, setShow] = useState(null); 
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  // ✅ Fetch show details
  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/getmovie/${id}`);
      if (data.success) setShow(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch occupied seats
  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`);
      if (data.success) setOccupiedSeats(data.occupiedSeats);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Create booking (like first code)
  const createBooking = async () => {
    try {
      if (!user) return toast.error('Please login to proceed');
      if (!selectedTime || !selectedSeats.length) return toast.error('Please select time and seat first');

      const { data } = await axios.post(
        `/api/booking/create`, 
        { showId: selectedTime.showId, selectedSeats }, 
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        window.location.href = data.url; // Stripe checkout or redirect
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getShow(); }, [id]);
  useEffect(() => { if (selectedTime) getOccupiedSeats(); }, [selectedTime]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast(t('pleaseSelectTime'));
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) return toast(t('maxSeatsReached'));
    if (occupiedSeats.includes(seatId)) return toast.error('Seat is already booked');

    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]);
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`; // ✅ same format as first code
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            disabled={occupiedSeats.includes(seatId)}
            className={`h-8 w-8 rounded border border-purple-600 cursor-pointer transition
              ${selectedSeats.includes(seatId) ? "bg-purple-600 text-white" : ""}
              ${occupiedSeats.includes(seatId) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  if (!show) {
    return <div className="flex items-center justify-center min-h-screen text-2xl text-white">{t('loading')}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 bg-black text-white">
      {/* Timings */}
      <div className="w-60 border border-purple-500 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">{t('availableTimings')}</p>
        <div>
          {show.datetime[date]?.map((time) => (
            <div
              key={time.showId}
              onClick={() => setSelectedTime(time)} 
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-md cursor-pointer transition 
                ${selectedTime?.showId === time.showId 
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
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          {groupRows.slice(1).map((group, idx) => (
            <div key={idx} className="flex justify-between gap-6 mb-6">
              {group.map((row) => renderSeats(row))}
            </div>
          ))}
        </div>
      </div>

      {/* Checkout */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={createBooking}
          className="flex items-center gap-2 bg-purple-600 text-white py-2 px-6 rounded-md text-sm hover:bg-red-600 transition-colors duration-300"
        >
          {t('proceedToCheckout')}
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
