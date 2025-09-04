import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import All_Page_Title from '../../components/admin/All_Page_Title';
import Loading from '../../components/loading';
import { Dateformat } from '../../libraries/Dateformat';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/Appcontext';

const Admin_Das = () => {
  const { axios, getToken, user, image_base_url} = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY || '$';
  
  const [DashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const [animatedData, setAnimatedData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: 0,
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    { title: "Total Bookings", value: animatedData.totalBookings, icon: ChartLineIcon },
    { title: "Total Revenue", value: animatedData.totalRevenue, icon: CircleDollarSignIcon },
    { title: "Active Movies", value: animatedData.activeShows, icon: PlayCircleIcon },
    { title: "Total Users", value: animatedData.totalUser, icon: UserIcon }
  ];

  const fetchDashboardData = async () => {
      try {
      const { data } = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        setDashboardData(data.dashboarddata);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching dashboard data", error)
      console.log(error);
    }
  }

   

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      const duration = 1000;
      const stepTime = 20;
      const steps = duration / stepTime;

      const increment = {
        totalBookings: DashboardData.totalBookings / steps,
        totalRevenue: DashboardData.totalRevenue / steps,
        activeShows: DashboardData.activeShows.length / steps,
        totalUser: DashboardData.totalUser / steps
      };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setAnimatedData(prev => ({
          totalBookings: Math.min(prev.totalBookings + increment.totalBookings, DashboardData.totalBookings),
          totalRevenue: Math.min(prev.totalRevenue + increment.totalRevenue, DashboardData.totalRevenue),
          activeShows: Math.min(prev.activeShows + increment.activeShows, DashboardData.activeShows.length),
          totalUser: Math.min(prev.totalUser + increment.totalUser, DashboardData.totalUser)
        }));
        if (currentStep >= steps) clearInterval(interval);
      }, stepTime);
    }
  }, [loading, DashboardData]);

  return !loading ? (
    <>
      <All_Page_Title text1="Admin" text2="Dashboard" />

      <div className='relative flex flex-wrap gap-4 mt-6'>
        {dashboardCards.map((card, index) => (
          <div 
            key={index} 
            className={`
              flex items-center justify-between px-4 py-4 rounded-lg w-full max-w-[14rem]
              ${index % 2 === 0 
                ? 'bg-gradient-to-br from-purple-900 to-black' 
                : 'bg-gradient-to-br from-black to-purple-800'
              }
              text-white shadow-lg hover:scale-105 transform transition-transform duration-300
            `}
          >
            <div>
              <h1 className='text-sm opacity-80'>{card.title}</h1>
              <p className='text-xl font-semibold mt-1'>
                {card.title === "Total Revenue"
                  ? `${currency}${Math.floor(card.value).toLocaleString()}`
                  : Math.floor(card.value).toLocaleString()
                }
              </p>
            </div>
            <card.icon className='w-6 h-6 text-purple-400' />
          </div>
        ))}
      </div>

      <p className='mt-10 text-lg font-medium'>Active Movies</p>
      <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
        {DashboardData.activeShows.map((show, index) => (
          <div 
            key={show._id} 
            className={`
              w-[220px] rounded-lg overflow-hidden h-full pb-3
              ${index % 2 === 0 
                ? 'bg-gradient-to-br from-purple-900 to-black' 
                : 'bg-gradient-to-br from-black to-purple-800'
              }
              border border-purple-700 hover:-translate-y-1 transition-transform duration-300
              text-white shadow-lg
            `}
          >
            <img src={image_base_url + show.movie.poster_path} alt={show.movie.title} className='h-60 w-full object-cover'/>
            <p className='font-medium p-2 truncate'>{show.movie.title}</p>
            <div className='flex items-center justify-between px-2'>
              <p className='text-lg font-medium'>{currency}{show.showPrice.toLocaleString()}</p>
              <p className='flex items-center gap-1 text-sm text-gray-300 mt-1 pr-1'>
                <StarIcon className='w-4 h-4 text-purple-400'/>
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className='px-2 pt-2 text-sm text-gray-300'>{Dateformat(show.showDateTime)}</p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Admin_Das;
