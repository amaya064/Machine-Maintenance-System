import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { FaUserPlus, FaUsers, FaClipboardList } from "react-icons/fa"; // Import icons

export default function User_view() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Remove user handler
  const handleRemoveUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to remove this user?");
    if (confirm) {
      try {
        await axios.delete(`http://localhost:3000/api/employees/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        alert("User removed successfully.");
      } catch (error) {
        console.error("Error removing user:", error);
        alert("Failed to remove user.");
      }
    }
  };

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
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          USER LIST
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 text-green-800">
                {user.email}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Address:</strong> {user.address}
              </p>
              <button
                onClick={() => handleRemoveUser(user._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300"
              >
                Drop User
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
