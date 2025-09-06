import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendar, 
  FaTools, 
  FaUserFriends, 
  FaCheckCircle, 
  FaSave,
  FaBuilding,
  FaCog,
  FaUser,
  FaIdBadge,
  FaUserTie,
  FaIndustry
} from 'react-icons/fa';

export default function Machine_maintenance_schedule() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    month: '',
    department: '',
    machineName: '',
    startDate: '',
    endDate: '',
    nextScheduleDate: '',
    frequency: '',
    pmTeam: '',
    checkType: ''
  });

  // Fetch machines from database
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/machines');
        setMachines(response.data.data);
      } catch (error) {
        console.error('Error fetching machines:', error);
        alert('Failed to fetch machines. Please check if the server is running.');
      }
    };

    fetchMachines();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/machines/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert('Maintenance schedule created successfully!');
        // Reset form
        setFormData({
          month: '',
          department: '',
          machineName: '',
          startDate: '',
          endDate: '',
          nextScheduleDate: '',
          frequency: '',
          pmTeam: '',
          checkType: ''
        });
      }
    } catch (error) {
      console.error('Error creating maintenance schedule:', error);
      alert(error.response?.data?.message || 'Failed to create maintenance schedule');
    } finally {
      setLoading(false);
    }
  };

  // Options for dropdowns
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const departments = [
    'Maintenance', 'Production', 'Quality Control', 'Engineering',
    'Operations', 'Technical Support', 'Facilities', 'Health & Safety'
  ];

  const frequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];
  
  const pmTeams = Array.from({length: 20}, (_, i) => `PMT-${(i + 1).toString().padStart(2, '0')}`);
  
  const checkTypes = ['A-Check', 'B-Check', 'C-Check'];

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
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/EmployeeRegistration")}
            >
              <FaUser className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">Register Employee</span>
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
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
            >
              <FaCalendar className="text-teal-300 text-sm mr-2" />
              <span className="text-sm text-gray-200">Maintenance Schedule</span>
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
              <FaCalendar className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">
              Machine Maintenance Schedule
            </h1>
            <p className="text-gray-600 text-xs">
              Schedule and manage machine maintenance activities
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Month Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaCalendar className="inline mr-1 text-teal-500 text-xs" />
                    Month
                  </label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  >
                    <option value="">Select Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>

                {/* Department Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaBuilding className="inline mr-1 text-teal-500 text-xs" />
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Machine Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaCog className="inline mr-1 text-teal-500 text-xs" />
                    Machine
                  </label>
                  <select
                    name="machineName"
                    value={formData.machineName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  >
                    <option value="">Select Machine</option>
                    {machines.map(machine => (
                      <option key={machine._id} value={machine.machineName}>
                        {machine.machineName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PM Team Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaUserFriends className="inline mr-1 text-teal-500 text-xs" />
                    PM Team
                  </label>
                  <select
                    name="pmTeam"
                    value={formData.pmTeam}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  >
                    <option value="">Select PM Team</option>
                    {pmTeams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* End Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* Next Schedule Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Next Schedule Date
                  </label>
                  <input
                    type="date"
                    name="nextScheduleDate"
                    value={formData.nextScheduleDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* Frequency */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  >
                    <option value="">Select Frequency</option>
                    {frequencies.map(freq => (
                      <option key={freq} value={freq}>{freq}</option>
                    ))}
                  </select>
                </div>

                {/* Check Type */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaCheckCircle className="inline mr-1 text-teal-500 text-xs" />
                    Check Type
                  </label>
                  <select
                    name="checkType"
                    value={formData.checkType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  >
                    <option value="">Select Check Type</option>
                    {checkTypes.map(check => (
                      <option key={check} value={check}>{check}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs"
                >
                  <FaSave className="mr-1 text-xs" />
                  {loading ? 'Saving...' : 'Save Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}