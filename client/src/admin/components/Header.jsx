import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserStore } from "../../stores/useUserStore";

const Header = ({ darkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { logout, user } = useUserStore();
  // Use user.profileImage if available, else fallback
  const profileImg =
    user?.image ||
    "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg";

  return (
    <div
      className={`py-4 px-4 max-h-16 w-full border-b z-40 border-stone-400 flex justify-between items-center sticky top-0 ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      <div>Admin Dashboard</div>
      <div className="relative">
        <img
          src={profileImg}
          alt="Profile"
          className="rounded-full w-[50px] h-[50px] cursor-pointer object-cover"
          onClick={toggleDropDown}
        />
        {dropdownOpen && (
          <ul
            className={`absolute right-0 mt-2 w-[150px]  border rounded shadow-md ${
              darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
            }`}
          >
            <Link
              className="p-2 block hover:bg-gray-100 cursor-pointer"
              to={`/admin/profile/${user._id}`}
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </Link>

            <Link
              to={"/admin/login"}
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
              className="p-2 block hover:bg-gray-100 cursor-pointer"
            >
              Sign Out
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};
Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Header;
