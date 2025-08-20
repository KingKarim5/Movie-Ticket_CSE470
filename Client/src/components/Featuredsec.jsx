import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './moviecard';
import { useAppContext } from '../context/Appcontext';

const Featuredsec = () => {
    const navigate = useNavigate();
    const { shows } = useAppContext();
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
                <button
                    onClick={() => navigate('/Movie')}
                    className='group flex items-center gap-2 text-sm text-gray-300'
                >
                    View All
                    <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
                </button>
            </div>
            <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
                {shows.slice(0,4).map((show)=>(<MovieCard key={show._id} movie={show}/>)
                )}
            </div>
            <div className='flex justify-center mt-20'>
                <button onClick={()=> {navigate('/Movie');scrollTo(0,0)}}className='px-10 py-3 text -sm gg-primary hover:bg-peimary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>

            </div>
        </div>
    );
};

export default Featuredsec;
