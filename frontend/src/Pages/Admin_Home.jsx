import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserPlus, FaClipboardList } from "react-icons/fa";

export default function Admin_Home() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    // Fetch the user count from the backend
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/signup/count");
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    // Fetch the employee count from the backend
    const fetchEmployeeCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/employees/count"
        );
        const data = await response.json();
        setEmployeeCount(data.count);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    fetchUserCount();
    fetchEmployeeCount();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-blue-700 to-indigo-600 text-white shadow-xl">
        {/* Profile Section */}
        <div className="p-6 border-b border-indigo-400">
          <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <img
                src="src/images/profilelogo.png"
                alt="Profile Icon"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Admin</h2>
              <p className="text-gray-300 text-sm">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul className="space-y-4">
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/adminhome")}
            >
              <FaUserPlus className="text-white text-lg mr-3" />
              <span className="font-medium">Admin Home</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/employeeregister")}
            >
              <FaUserPlus className="text-white text-lg mr-3" />
              <span className="font-medium">Register Employee</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/employeeview")}
            >
              <FaUsers className="text-white text-lg mr-3" />
              <span className="font-medium">View Employees</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/userview")}
            >
              <FaUsers className="text-white text-lg mr-3" />
              <span className="font-medium">View Users</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/order")}
            >
              <FaClipboardList className="text-white text-lg mr-3" />
              <span className="font-medium">View Orders</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            {/* Icon and Title */}
            <div className="text-white text-3xl font-bold flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L3 7v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-9-5z"></path>
              </svg>
              <h1>Welcome, Admin</h1>
            </div>
          </div>

          <div className="text-white">
            <p className="text-lg font-medium">
              Manage your tasks efficiently.
            </p>
          </div>
        </header>

        {/* Cards Section */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-6">
              <FaUserPlus className="text-blue-500 text-5xl" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Registered Users
                </h3>
                <p className="mt-4">
                  <strong className="text-4xl text-blue-600 font-extrabold">
                    {userCount}
                  </strong>
                  <span className="text-gray-600 text-lg ml-2">Users</span>
                </p>
              </div>
            </div>
          </div>

          {/* Registered Employees Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-green-500 text-4xl" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Registered Employees
                </h3>
                <p className="text-gray-600 mt-2">
                  <strong className="text-4xl text-green-600 font-extrabold">
                    {employeeCount}
                  </strong>
                  <span className="text-lg ml-2">Employees</span>
                </p>
              </div>
            </div>
          </div>

          {/* View Orders Card */}
          <div
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate("/order")}
          >
            <div className="flex items-center space-x-4">
              <FaClipboardList className="text-purple-500 text-4xl" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">View Orders</h3>
                <p className="text-gray-600 mt-2">
                  Monitor and manage customer orders effectively.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
