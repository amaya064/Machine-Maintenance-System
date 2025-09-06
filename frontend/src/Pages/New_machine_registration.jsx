import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCog,
  FaBuilding,
  FaUser,
  FaHashtag,
  FaBarcode,
  FaFileAlt,
  FaShoppingCart,
  FaCalendar,
  FaTools,
  FaExclamationTriangle,
  FaIndustry,
  FaPlusCircle,
  FaSave
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function New_machine_registration() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get machine ID from URL if in edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    machineName: "",
    department: "",
    technicianName: "",
    model: "",
    serialNumber: "",
    prNumber: "",
    poNumber: "",
    manufactureDate: "",
    installationDate: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if we're in edit mode and fetch machine data
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchMachineData();
    }
  }, [id]);

  const fetchMachineData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/machines`);
      const machine = response.data.data.find(m => m._id === id);
      
      if (machine) {
        setFormData({
          machineName: machine.machineName || "",
          department: machine.department || "",
          technicianName: machine.technicianName || "",
          model: machine.model || "",
          serialNumber: machine.serialNumber || "",
          prNumber: machine.prNumber || "",
          poNumber: machine.poNumber || "",
          manufactureDate: machine.manufactureDate ? new Date(machine.manufactureDate).toISOString().split('T')[0] : "",
          installationDate: machine.installationDate ? new Date(machine.installationDate).toISOString().split('T')[0] : ""
        });
      }
    } catch (error) {
      console.error('Error fetching machine data:', error);
      setError("Failed to load machine data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (isEditMode) {
        // Update existing machine
        const response = await axios.put(
          `http://localhost:3000/api/machines/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );
        
        alert(response.data.message);
        navigate("/Machine_view");
      } else {
        // Register new machine
        const response = await axios.post(
          "http://localhost:3000/api/machines/register",
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );
        
        alert(response.data.message);
        navigate("/Machine_view");
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      if (error.response) {
        setError(error.response.data.message || "Operation failed");
        alert(error.response.data.message || "Operation failed");
      } else if (error.request) {
        setError("No response from server. Please check if the server is running.");
        alert("No response from server. Please check if the server is running.");
      } else {
        setError(error.message || "Something went wrong");
        alert(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl">
        {/* Navigation Menu */}
        <nav className="mt-5">
          <ul className="space-y-2">
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/EmployeeRegistration")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">Register Employees</span>
            </li>
            <li
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
            >
              <FaCog className="text-teal-300 text-sm mr-2" />
              <span className="text-sm text-gray-200">{isEditMode ? 'Update Machine' : 'Register Machine'}</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/Machine_view")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View Machines</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/technician-view")}
            >
              <FaUser className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View Employees</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/Machine_maintenance_schedule")}
            >
              <FaCalendar className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">Maintenance Schedule</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl mb-4">
              <FaIndustry className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isEditMode ? 'Update Machine' : 'Register New Machine'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isEditMode ? 'Update existing industrial equipment' : 'Add new industrial equipment to your maintenance system'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center text-sm">
              <FaExclamationTriangle className="mr-2 text-red-500 text-xs" />
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaCog className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="text"
                      id="machineName"
                      name="machineName"
                      placeholder="Machine Name"
                      value={formData.machineName}
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaBuilding className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      placeholder="Department"
                      value={formData.department}
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaUser className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="text"
                      id="technicianName"
                      name="technicianName"
                      placeholder="Technician Name"
                      value={formData.technicianName}
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaHashtag className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      placeholder="Model"
                      value={formData.model}
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Right Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaBarcode className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="text"
                      id="serialNumber"
                      name="serialNumber"
                      placeholder="Serial Number"
                      value={formData.serialNumber}
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaFileAlt className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="text"
                      id="prNumber"
                      name="prNumber"
                      placeholder="PR Number"
                      value={formData.prNumber}
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaShoppingCart className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="text"
                      id="poNumber"
                      name="poNumber"
                      placeholder="PO Number"
                      value={formData.poNumber}
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaCalendar className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="date"
                      id="manufactureDate"
                      name="manufactureDate"
                      value={formData.manufactureDate}
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center group-focus-within:bg-teal-200 transition-colors">
                      <FaCalendar className="text-teal-600 text-xs" />
                    </div>
                    <input
                      type="date"
                      id="installationDate"
                      name="installationDate"
                      value={formData.installationDate}
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isEditMode ? 'Updating...' : 'Registering...'}
                  </>
                ) : (
                  <>
                    {isEditMode ? (
                      <>
                        <FaSave className="mr-2 text-xs" />
                        Update Machine
                      </>
                    ) : (
                      <>
                        <FaPlusCircle className="mr-2 text-xs" />
                        Register Machine
                      </>
                    )}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}