import React, { useEffect, useState } from 'react';
import All_Page_Title from '../../components/admin/All_Page_Title';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/loading'; // optional, if you have a loading component
import { useAppContext } from '../../context/Appcontext';
import { Dateformat } from '../../libraries/Dateformat';

const List_Shows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user} = useAppContext()
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getShows = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-shows', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      setShows(data.showdata);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(user) {
      getShows();
    }
  }, [user]);

  if (loading) {
    return <Loading />; // optional fallback
  }

  return (
    <>
      <All_Page_Title text1="List" text2="Movies" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-purple-900 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Movie Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {shows.map((show, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? 'bg-purple-700 text-white'
                    : 'bg-black text-white'
                }
              >
                <td className="p-2 pl-5">{show.movie.title}</td>
                <td className="p-2">{Dateformat(show.showDateTime)}</td>
                <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                <td className="p-2">{currency}{Object.keys(show.occupiedSeats).length * (show.showPrice ?? show.showprice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List_Shows;
