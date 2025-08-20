import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Blurcircle from '../components/Blurcircle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../libraries/timeformat';
import Selectdate from '../components/Selectdate';
import Loading from '../components/loading';
import ReactPlayer from 'react-player';
import { t } from '../libraries/i18n';
import { useAppContext } from '../context/Appcontext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const { shows, axios, getToken, user, fetchfavoriteMovies, favoriteMovies, image_base_url} = useAppContext()

const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if (data.success) {
        setShow(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlefavorite = async () => {
    try {
      if (!user) {
        return toast.error('Please login to proceed');
      }
      const { data } = await axios.post('/api/user/updatefavorites', { movieId: id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        await fetchfavorites();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  } 
  // Get recommended movies based on genre
  const getRecommendedMovies = () => {
    if (show) {
      return show.filter(
        (movie) => movie._id !== id && movie.genres.some((genre) => 
          show.movie.genres.map((g) => g.name).includes(genre.name)
        )
      );
    }
    return [];
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (show === null) {
    return <Loading />;
  }

  const recommendedMovies = getRecommendedMovies();

  const handleBuyTicket = (movieId) => {
    navigate(`/movies/${movieId}`);
    scrollTo(0, 0);
  };

  const scrollToTrailer = () => {
    const trailerSection = document.getElementById('trailer-section');
    if (trailerSection) {
      trailerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={image_base_url + show.movie.poster_path}
          alt={`${show.movie.title} poster`}
          className="max-md:auto rounded-xl h-104 max-w-70 object-cover"
        />
        <div className="relative flex flex-col gap-3">
          <Blurcircle top="-100px" left="-100px" />
          <p className="text-primary">English</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} {t('userRating')}
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>
          <p>
            {timeFormat(show.movie.runtime)} |{' '}
            {show.movie.genres.map((genre) => genre.name).join(' , ')} |{' '}
            {new Date(show.movie.release_date.split('-')[0]).getFullYear()}
          </p>
          <div className="flex items-center gap-x-4">
            <button 
              onClick={scrollToTrailer}
              className="flex items-center gap-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition"
            >
              <PlayCircleIcon className="w-5 h-5" />
              {t('watchTrailer')}
            </button>
            <a
              href="#selectdate"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById('selectdate');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition inline-flex items-center"
            >
              {t('buyTicket')}
            </a>
            <button href="#cast" onClick={handleDate} className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition">
              <Heart  className={`w-5 h-5 ${favorites.find(movie => movie._id === id) ?  ' text-primary fill-primary' : ''}`}/>
            </button>
          </div>
        </div>
      </div>
      <p>{t('yourFavouriteCasts')}</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={image_base_url + cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Selectdate dateTime={show.dateTime} id={id} />

      {/* Recommended Movies Section */}
      {recommendedMovies.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white">{t('youMayAlsoLike')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {recommendedMovies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-xl">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="rounded-xl h-52 w-full object-cover"
                />
                <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-500 text-sm">{movie.genres.map((genre) => genre.name).join(', ')}</p>

                {/* Movie actions */}
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => handleBuyTicket(movie.id)}
                    className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 transition-all cursor-pointer"
                  >
                    {t('buyTicket')}
                  </button>
                  <button className="text-yellow-400 hover:text-yellow-500">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trailer Section */}
      <div id="trailer-section" className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">{t('watchTrailer')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch the official trailer for {show.movie.title} and get a glimpse of the action, drama, and excitement that awaits you.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Blurcircle top="-50px" left="-50px" />
          <Blurcircle bottom="-50px" right="-50px" />
          
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=4LiHg8nUlFw"
              controls={true}
              width="100%"
              height="500px"
              className="mx-auto"
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                  }
                }
              }}
            />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {t('watchTrailer')} • {show.movie.title} • {new Date(show.movie.release_date).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading /> 
  );
};

export default MovieDetails;
