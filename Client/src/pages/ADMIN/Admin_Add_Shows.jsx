import React, { useEffect, useState } from 'react';
// removed dummyShowsData import
import All_Page_Title from '../../components/admin/All_Page_Title';
import { Converter } from '../../libraries/Converter';
import { CheckIcon, StarIcon } from 'lucide-react';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';

const Admin_Add_Shows = () => {
  const { axios, getToken, user, image_base_url} = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [showPrice, setShowPrice] = useState('');
  const [addingShow, setAddingShow] = useState(false)

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get('/api/show/now-playing', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        setNowPlayingMovies(data.movies)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchNowPlayingMovies();
    }
  }, [user]);

  const handleAddDateTime = () => {
    if (!dateTimeInput) return;

    const [date, time] = dateTimeInput.split('T');
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });

    setDateTimeInput('');
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev; // remove the date key entirely
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };
  const handleSubmit = async () => {
    try {

      setAddingShow(true)
      if (!selectedMovie || Object.entries(dateTimeSelection).length === 0 || !showPrice) {
        return toast.error('Missing required fields')
      }
      const showsInput = Object.entries(dateTimeSelection).map(([date, times]) => ({ date, time: times }))
      
      const payload = {
        movieId: selectedMovie,
        showsInput,
        showprice: Number(showPrice)
      }
      const { data } = await axios.post('/api/show/add', payload, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        toast.success(data.message);
        setSelectedMovie(null);
        setDateTimeInput('');
        setDateTimeSelection({});
        setShowPrice('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error",error)
      toast.error('An error occured. Please try again!')
    }
    setAddingShow(false)
  }

  // initial fetch handled in the effect above

  return nowPlayingMovies.length > 0 ? (
    <>
      <All_Page_Title text1="Add" text2="Movies" />

      {/* Now Playing Movies */}
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="group flex flex-wrap gap-4 mt-4 w-max">
        {nowPlayingMovies.map((movie) => (
          <div
            key={movie.id}
            className={`relative cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 
              rounded-lg p-1
              bg-gradient-to-r from-purple-700 via-black to-purple-900
              w-36
            `}
            onClick={() => setSelectedMovie(movie.id)}
          >
            <div className="relative rounded-lg overflow-hidden bg-black">
              <img src={image_base_url + movie.poster_path}
                alt={''}
                className="w-full h-52 object-cover brightness-90 rounded-lg"
              />
              <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0 rounded-b-lg">
                <p className="flex items-center gap-1 text-gray-400">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-gray-300">{Converter(movie.vote_count)} Votes</p>
              </div>
            </div>

            {selectedMovie === movie.id && (
              <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            )}

            <p className="font-medium truncate mt-1 text-sm">{movie.title}</p>
            <p className="text-gray-400 text-xs">{movie.release_date}</p>
          </div>
        ))}
      </div>

      {/* Show Price */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter movie price"
            className="outline-none bg-transparent text-white w-24"
          />
        </div>
      </div>

      {/* Date and Time Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Add Show Date & Time</label>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="border border-gray-600 px-3 py-2 rounded-md outline-none bg-transparent text-white"
          />
          <button
            onClick={handleAddDateTime}
            disabled={addingShow}
            className="px-4 py-2 bg-red-600 hover:bg-purple-700 text-white rounded-md"
          >
            Add Time
          </button>
        </div>

        {/* Selected Date/Time List */}
        <ul className="mt-4 text-sm text-white space-y-2">
          {Object.entries(dateTimeSelection).map(([date, times]) => (
            <li key={date} className="bg-black/50 px-3 py-2 rounded">
              <strong>{date}</strong>
              <ul className="ml-4 mt-1 space-y-1">
                {times.map((time) => (
                  <li
                    key={time}
                    className="flex justify-between items-center bg-black/40 px-2 py-1 rounded"
                  >
                    <span>{time}</span>
                    <button
                      onClick={() => handleRemoveTime(date, time)}
                      className="text-red-600 hover:bg-purple-700 hover:text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={addingShow}
          className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md"
        >
          Create Shows
        </button>
      </div>
    </>
  ) : null;
};

export default Admin_Add_Shows;
