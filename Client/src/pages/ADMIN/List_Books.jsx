import React, { useEffect, useState } from 'react';
import All_Page_Title from '../../components/admin/All_Page_Title';
import Loading from '../../components/loading';
import { Dateformat } from '../../libraries/Dateformat';
import { useAppContext } from '../../context/Appcontext';

const List_Books = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const { axios, getToken, user} = useAppContext()
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-bookings', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        setBookings(data.bookings || []);
        setLoading(false);
      } else {
        setBookings(data.bookings);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <All_Page_Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-purple-900 text-left text-white">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Movie Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? 'bg-purple-700 text-white'
                    : 'bg-black text-white'
                }
              >
                <td className="p-2 pl-5">{item.user?.name || 'N/A'}</td>
                <td className="p-2">{item.show?.movie?.title || 'Untitled'}</td>
                <td className="p-2">{Dateformat(item.show?.showDateTime)}</td>
                <td className="p-2">{Array.isArray(item.bookedseats) ? item.bookedseats.join(', ') : ''}</td>
                <td className="p-2">{currency}{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List_Books;
