import { LayoutDashboardIcon, ListCollapseIcon, PlusSquareIcon, ListIcon, TagIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = {
    first_name: "Admin",
    last_name: "User",
  };

  const adminLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Bookings", path: "/admin/bookings", icon: ListCollapseIcon },
    { name: "Shows", path: "/admin/shows", icon: ListIcon },
    { name: "Add Show", path: "/admin/add-show", icon: PlusSquareIcon },
    { name: "Promos", path: "/admin/promos", icon: TagIcon },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-[13rem] md:max-w-[15rem] w-full border-r border-gray-300/20 text-sm">
      <p className="mt-2 text-base max-md:hidden">
        {user.first_name} {user.last_name}
      </p>

      <div className="w-full">
        {adminLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={index}
              to={link.path} end 
              className={({ isActive }) =>
                `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 text-gray-400 
                hover:bg-purple-100 hover:text-purple-600 transition-colors duration-200
                ${isActive ? "bg-primary/15 text-primary group" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <p className="max-md:hidden">{link.name}</p>
                  <span
                    className={`w-1.5 h-10 rounded-l right-0 absolute ${
                      isActive ? "bg-primary" : ""
                    }`}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
