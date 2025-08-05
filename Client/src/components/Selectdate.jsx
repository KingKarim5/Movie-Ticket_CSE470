import React, { useState } from 'react';  
import Blurcircle from './Blurcircle';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Selectdate = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // Function to handle booking after date selection
  const onBookHandler = () => {
    if (!selected) {
      return toast('Please select the date');
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0); // Scroll to the top of the page
  };

  // Function to highlight the current date
  const isToday = (date) => {
    const today = new Date();
    const currentDate = new Date(date);
    return today.toDateString() === currentDate.toDateString();
  };

  return (
    <div id="selectdate" className="pt-30">
      <div className="relative p-8 bg-gradient-to-r from-black to-purple-600 border border-primary/20 rounded-lg shadow-lg">
        <Blurcircle top="-100px" left="-100px" />
        <Blurcircle bottom="100px" right="0px" />
        
        <div className="text-center">
          <p className="text-2xl font-bold text-white">SELECT  DATE</p>

          {/* Date Grid Layout */}
          <div className="grid grid-cols-7 gap-4 mt-8">
            {Object.keys(dateTime).map((date, index) => (
              <button
                key={index}
                onClick={() => setSelected(date)} // Set the selected date
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-full cursor-pointer 
                  ${selected === date ? "bg-red-700 text-white" : "bg-white text-gray-800 border-2 border-primary/40"}
                  ${isToday(date) ? "border-2 border-yellow-500" : ""}
                  hover:bg-red-600 hover:text-white transition-all duration-300`}
              >
                <span className="text-lg font-semibold">{new Date(date).getDate()}</span>
                <span className="text-xs font-medium">
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                  })}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={onBookHandler}
          className="mt-6 bg-red-700 text-white px-8 py-2 rounded-full hover:bg-red-800 transition-all cursor-pointer shadow-lg transform hover:scale-105"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Selectdate;
