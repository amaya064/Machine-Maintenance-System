import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaClipboardList,
  FaUsers,
  FaPlusCircle,
  FaChartLine,
  FaTools,
  FaEye,
  FaCog,
  FaUserFriends,
  FaChartBar,
  FaWrench
} from "react-icons/fa";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/"); 
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-3 shadow-xl border-b border-gray-700 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Compact Version */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-1.5 rounded-md group-hover:from-teal-400 group-hover:to-cyan-400 transition-all duration-300 shadow-sm">
            <FaTools className="text-lg text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-teal-400">M</span>M
            </span>
            <span className="text-[10px] text-gray-400 -mt-1">Industrial</span>
          </div>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-lg focus:outline-none p-1.5 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links - Always Visible */}
        <div className={`
          lg:flex flex-col lg:flex-row lg:items-center lg:space-x-0 absolute lg:static top-full left-0 w-full lg:w-auto
          bg-gray-800 lg:bg-transparent z-50 px-4 lg:px-0 py-3 lg:py-0 shadow-xl lg:shadow-none
          transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"}
        `}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-0 space-y-3 lg:space-y-0">
            <Link 
              to="/" 
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-md hover:bg-gray-700 transition-colors group text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-1 bg-gray-700 rounded group-hover:bg-teal-500 transition-colors">
                <FaHome className="text-teal-400 group-hover:text-white text-xs" />
              </div>
              <span>Home</span>
            </Link>
            
            {/* Always show these menu items regardless of login status */}
            <Link 
              to="/Machine_maintenance_schedule" 
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-md hover:bg-gray-700 transition-colors group text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-1 bg-gray-700 rounded group-hover:bg-teal-500 transition-colors">
                <FaClipboardList className="text-teal-400 group-hover:text-white text-xs" />
              </div>
              <span>Schedule</span>
            </Link>
            
            <Link 
              to="/pm-team-view" 
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-md hover:bg-gray-700 transition-colors group text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-1 bg-gray-700 rounded group-hover:bg-teal-500 transition-colors">
                <FaUserFriends className="text-teal-400 group-hover:text-white text-xs" />
              </div>
              <span>Team</span>
            </Link>
            
            <Link 
              to="/New_machine_registration" 
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-md hover:bg-gray-700 transition-colors group text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-1 bg-gray-700 rounded group-hover:bg-teal-500 transition-colors">
                <FaPlusCircle className="text-teal-400 group-hover:text-white text-xs" />
              </div>
              <span>New Machine</span>
            </Link>
            
            <Link 
              to="/pm-post-evaluation" 
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-md hover:bg-gray-700 transition-colors group text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-1 bg-gray-700 rounded group-hover:bg-teal-500 transition-colors">
                <FaChartBar className="text-teal-400 group-hover:text-white text-xs" />
              </div>
              <span>Evaluation</span>
            </Link>
            
            <Link 
              to="/pm-admin-tool" 
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-md hover:bg-gray-700 transition-colors group text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-1 bg-gray-700 rounded group-hover:bg-teal-500 transition-colors">
                <FaWrench className="text-teal-400 group-hover:text-white text-xs" />
              </div>
              <span>Admin Tool</span>
            </Link>
          </div>
        </div>

        {/* User Profile or Login Button */}
        <div className="hidden lg:flex items-center space-x-2">
          {email ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate(`/employee_profile/${email}`)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-gray-700 hover:bg-teal-600 transition-colors group border border-gray-600 text-sm"
              >
                <FaUserCircle className="text-teal-400 group-hover:text-white text-xs" />
                <span className="max-w-[100px] truncate">{email}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 rounded-md bg-gray-700 hover:bg-red-600 transition-colors group border border-gray-600"
                title="Logout"
              >
                <FaSignOutAlt className="text-red-400 group-hover:text-white text-xs" />
              </button>
            </div>
          ) : (
            <Link
              to="/Shop_workers_Login"
              className="flex items-center space-x-1.5 border border-teal-600 text-teal-300 px-3 py-1.5 rounded-md font-medium hover:bg-teal-600 transition-colors text-sm"
            >
              <FaUserCircle className="text-xs" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile user menu */}
        {email && (
          <div className={`lg:hidden absolute top-full left-0 w-full bg-gray-800 px-4 py-3 shadow-xl ${menuOpen ? "block" : "hidden"} border-t border-gray-700`}>
            <div className="flex items-center justify-between pt-3">
              <button
                onClick={() => {
                  navigate(`/profile/${email}`);
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-300 text-sm"
              >
                <FaUserCircle />
                <span className="max-w-[150px] truncate">{email}</span>
              </button>
              
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-1.5 text-red-400 hover:text-red-300 bg-gray-700 px-2 py-1.5 rounded-md text-sm"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Mobile login button */}
        {!email && menuOpen && (
          <div className={`lg:hidden absolute top-full left-0 w-full bg-gray-800 px-4 py-3 shadow-xl border-t border-gray-700 flex flex-col space-y-2`}>
            <Link
              to="/Shop_workers_Login"
              className="flex items-center justify-center space-x-1.5 border border-teal-600 text-teal-300 px-3 py-1.5 rounded-md font-medium hover:bg-teal-600 transition-colors text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserCircle />
              <span>Login</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}