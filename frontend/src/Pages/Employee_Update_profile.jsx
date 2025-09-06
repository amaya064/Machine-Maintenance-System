import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserEdit,
} from "react-icons/fa";

export default function Employee_Update_profile() {
  const [employee, setEmployee] = useState({});
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setEmployee(userData);
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/signup/profile/${employee.email}`,
        { phone, address }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/employee_profile/:username");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <FaUserEdit className="text-4xl text-blue-500" />
          <h2 className="text-3xl font-semibold text-gray-800 ml-2">Update Profile</h2>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Email Field */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700">Email (Read-only)</label>
            <div className="flex items-center mt-1">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="text"
                value={employee.email}
                disabled
                className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-500"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="flex items-center mt-1">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <div className="flex items-center mt-1">
              <FaMapMarkerAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate("/employee_profile/:username")}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
