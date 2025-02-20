import React, { useState } from "react";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  CreditCardIcon,
  FileTextIcon,
  BuildingIcon,
  MoonIcon,
  SunIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"; // Using lucide-react for icons
import { FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ setDarkMode, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const user = { name: "Edeh Chinedu", role: "admin" };
  return (
    <section
      className={`h-full transition-all duration-300 border-r border-stone-400 sticky top-0 left-0 z-50 ${
        isOpen
          ? "w-[350px]"
          : "w-[100px] flex flex-col justify-center items-center"
      } ${darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"}`}
    >
      {/* Sidebar Header */}
      <div className="border-b border-stone-400 h-16 py-4 flex items-center gap-2 justify-between px-4">
        <span className="font-bold text-xl">Logo</span>
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="mt-2 space-y-2 px-2">
        <li className="hover:bg-emerald-300 px-3 py-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <HomeIcon size={24} />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="hover:bg-emerald-300 px-3 py-2">
          <Link
            to="/admin/appointment"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <CalendarIcon size={24} />
            {isOpen && <span>Appointments</span>}
          </Link>
        </li>
        <li className="hover:bg-emerald-300 px-3 py-2">
          <Link
            to="/admin/customer"
            className="flex items-center gap-3 hover:text-blue-600"
          >
            <UsersIcon size={24} />
            {isOpen && <span>Customers</span>}
          </Link>
        </li>
        <li className="border-y border-stone-300">
          <h4 className="text-gray-500 text-sm my-2">Payments</h4>
          <Link
            to="/admin/ledger"
            className="flex items-center gap-3 hover:bg-emerald-300 px-3 py-2"
          >
            <CreditCardIcon size={24} />
            {isOpen && <span>Ledger</span>}
          </Link>
        </li>
        <li className="border-b border-stone-300">
          <h4 className="text-gray-500 text-sm mt-4">Listings</h4>
          <Link
            to="/admin/real-estate"
            className="flex items-center gap-3 hover:text-blue-600 hover:bg-emerald-300 px-3 py-2"
          >
            <BuildingIcon size={24} />
            {isOpen && <span>Real Estate</span>}
          </Link>
          <Link
            to="/admin/insurance"
            className="flex items-center gap-3 hover:text-blue-600 hover:bg-emerald-300 px-3 py-2"
          >
            <FileTextIcon size={24} />
            {isOpen && <span>Insurance</span>}
          </Link>
        </li>
        <li className="border-b border-stone-300">
          <h4 className="text-gray-500 text-sm mt-4">Blogs</h4>
          <Link
            to="/admin/create-blog"
            className="flex items-center gap-3 hover:text-blue-600 hover:bg-emerald-300 px-3 py-2"
          >
            <FileTextIcon size={24} />
            {isOpen && <span>Create Blog</span>}
          </Link>
          <Link
            to="/admin/blog-list"
            className="flex items-center gap-3 hover:text-blue-600 hover:bg-emerald-300 px-3 py-2"
          >
            <FileTextIcon size={24} />
            {isOpen && <span>Blogs List</span>}
          </Link>
          <Link
            to="/admin/blog-AI"
            className="flex items-center gap-3 hover:text-blue-600 hover:bg-emerald-300 px-3 py-2"
          >
            <FaRobot size={24} />
            {isOpen && <span>Use AI</span>}
          </Link>
        </li>
      </ul>

      {/* Dark Mode Toggle */}
      <div className="mt-6 px-4">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 hover:text-blue-600"
        >
          {darkMode ? <SunIcon size={24} /> : <MoonIcon size={24} />}
          {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>

      {/* User Profile and Logout */}
      <div className="w-full mt-2 flex flex-col px-5">
        <div className="flex items-center gap-3 justify-start">
          <img
            src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
            alt="User"
            className="rounded-full w-[40px] h-[40px] object-cover"
          />
          {isOpen && (
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
