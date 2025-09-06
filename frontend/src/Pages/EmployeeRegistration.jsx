import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaIdBadge, 
  FaBuilding, 
  FaUserTie, 
  FaTools, 
  FaSignInAlt,
  FaCog,
  FaCalendar,
  FaIndustry
} from 'react-icons/fa';

export default function EmployeeRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    position: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Department options
  const departments = [
    'Maintenance',
    'Production',
    'Quality Control',
    'Engineering',
    'Operations',
    'Technical Support',
    'Facilities',
    'Health & Safety'
  ];

  useEffect(() => {
    console.log("Employee Registration component loaded");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const generateEmployeeId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({
      ...formData,
      employeeId: id
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/employees/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }

      setError(null);
      alert('Employee registered successfully!');
      navigate("/adminhome");
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl">
        {/* Profile Section */}
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
              <img
                src="src/images/profilelogo.png"
                alt="Profile Icon"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Admin</h2>
              <p className="text-gray-400 text-xs">Machine Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-5">
          <ul className="space-y-2">
            
            <li
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
            >
              <FaUser className="text-teal-300 text-sm mr-2" />
              <span className="text-sm text-gray-200">Register Employee</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/New_machine_registration")}
            >
              <FaCog className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">Register Machine</span>
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
              <span className="text-sm group-hover:text-gray-200">View Technicians</span>
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl mb-3">
              <FaUser className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">Employee Registration</h1>
            <p className="text-gray-600 text-xs">Register new team members for machine maintenance</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <FaUser className="text-teal-600 text-xs ml-1" />
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-xs py-1"
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <FaIdBadge className="text-teal-600 text-xs ml-1" />
                    <input
                      type="text"
                      id="employeeId"
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-xs py-1"
                      placeholder="Employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      maxLength={5}
                      required
                    />
                    <button
                      type="button"
                      onClick={generateEmployeeId}
                      className="ml-1 bg-teal-500 text-white px-2 py-1 rounded text-xs hover:bg-teal-600 transition-colors"
                    >
                      Generate
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <FaBuilding className="text-teal-600 text-xs ml-1" />
                    <select
                      id="department"
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-xs py-1"
                      onChange={handleChange}
                      value={formData.department}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <FaUserTie className="text-teal-600 text-xs ml-1" />
                    <select
                      id="position"
                      className="w-full bg-transparent focus:outline-none text-gray-700 text-xs py-1"
                      onChange={handleChange}
                      value={formData.position}
                      required
                    >
                      <option value="">Select Position</option>
                      <option value="Manager">Manager</option>
                      <option value="Executive">Executive</option>
                      <option value="Technician">Technician</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Specialist">Specialist</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <FaUser className="text-teal-600 text-xs ml-1" />
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-xs py-1"
                      placeholder="Email Address"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                    <FaIdBadge className="text-teal-600 text-xs ml-1" />
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-xs py-1"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full p-2 text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-xs hover:from-teal-600 hover:to-cyan-600 transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Registering Employee...' : 'Register Employee'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}