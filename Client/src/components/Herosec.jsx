


import { ArrowRight, CalculatorIcon, ClockIcon } from 'lucide-react';
import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Herosec = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/Fantastic_4.jpg")] bg-cover bg-center h-screen'> 
      <h1 className='text-5xl md:text-5xl mg:text-[70px] md:leading-18 font semibold max-w-110'>
        Fantastic 4 <br/> 
      </h1>
      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1 '>
          <CalculatorIcon className='w-4.5 h-4.5'/> 2025  
        </div>
        <div className='flex items-center gap-1 '>
          <ClockIcon className='w-4.5 h-4.5'/> 1h 55min  
        </div>
      </div>
      <p className="max-w-md text-gray-300 italic">
        In a world where science meets disaster, four individuals gain incredible powers after a catastrophic event. Together, they must fight to stop a villain who threatens the very existence of humanity.

      </p>

      <div className="mt-4 text-center text-white">
        <span className="text-lg">Live in theatres near you</span>
      </div>


      <button onClick={() => navigate('/')} className='flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Search Movies
        <ArrowRight className='w-5 h-5'/>
      </button>
    </div>
  );
};

export default Herosec;
