import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL 

export const Appcontext = createContext()

export const AppProvider = ({ children }) => {
    const [isAdmin, setisAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavorites] = useState([]);

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
    const { user } = useUser();
    const { getToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchisAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            setisAdmin(data.isAdmin);

            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/');
                toast.error('You are not authorized to access the admin dashboard.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchshows = async () => {
        try {
            const { data } = await axios.get('/api/show/all');
            if (data.success) {
                setShows(data.shows);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchfavoriteMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/getfavorites', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });

            if (data.success) {
                setFavorites(data.movies);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchshows();
    }, []);

    useEffect(() => {
        if (user) {
            fetchisAdmin();
            fetchfavoriteMovies();
        }
    }, [user]);

    const value = {
        axios,
        fetchisAdmin,
        user,
        getToken,
        navigate,
        isAdmin,
        shows,
        favoriteMovies,          
        fetchfavoriteMovies,
        image_base_url
    };

    return (
        <Appcontext.Provider value={value}>
            {children}
        </Appcontext.Provider>
    );
};

export const useAppContext = () => useContext(Appcontext);
