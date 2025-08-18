import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import All_Page_Title from '../../components/admin/All_Page_Title';
import Loading from '../../components/Loading';
import { Dateformat } from '../../libraries/Dateformat';

const List_Books = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      setBookings(dummyBookingData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

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
                <td className="p-2">
                  {(item.bookedSeats ? Object.values(item.bookedSeats) : []).join(', ')}
                </td>
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
