import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/Appcontext";
import toast from "react-hot-toast";
import Loading from '../../components/loading';

const Layout = () => {
    const { isAdmin, fetchisAdmin } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                await fetchisAdmin();
                setIsLoading(false);
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsLoading(false);
            }
        };

        checkAdminStatus();
    }, [fetchisAdmin]);

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            toast.error("You are not authorized to access the admin dashboard.");
            navigate('/');
        }
    }, [isAdmin, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-white">Loading...</div>
            </div>
        );
    }

    if (!isAdmin) {
        return null; // Will redirect to home
    }

    return (
      <>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
            {/* This is where the child components will be rendered */}
            <Outlet />
          </div>
        </div>
      </>
    )
}
export default Layout;