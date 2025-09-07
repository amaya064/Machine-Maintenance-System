import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [scheduleId, setScheduleId] = useState('');
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

  // Check if we're in edit mode
  useEffect(() => {
    if (location.state && location.state.editMode && location.state.scheduleData) {
      setEditMode(true);
      setScheduleId(location.state.scheduleData._id);
      
      // Format dates for input fields
      const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setFormData({
        month: location.state.scheduleData.month,
        department: location.state.scheduleData.department,
        machineName: location.state.scheduleData.machineName,
        startDate: formatDateForInput(location.state.scheduleData.startDate),
        endDate: formatDateForInput(location.state.scheduleData.endDate),
        nextScheduleDate: formatDateForInput(location.state.scheduleData.nextScheduleDate),
        frequency: location.state.scheduleData.frequency,
        pmTeam: location.state.scheduleData.pmTeam,
        checkType: location.state.scheduleData.checkType
      });
    }
  }, [location.state]);

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
      let response;
      if (editMode) {
        // Update existing schedule
        response = await axios.put(
          `http://localhost:3000/api/machines/schedules/${scheduleId}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // Create new schedule
        response = await axios.post(
          'http://localhost:3000/api/machines/create',
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      if (response.data.success) {
        alert(`Maintenance schedule ${editMode ? 'updated' : 'created'} successfully!`);
        // Reset form
        setFormData({
          month: '',
          machineName: '',
          department: '',
          startDate: '',
          endDate: '',
          nextScheduleDate: '',
          frequency: '',
          pmTeam: '',
          checkType: ''
        });
        
        // Navigate back to view page after successful update
        if (editMode) {
          navigate('/View_Maintenance_Schedule');
        }
      }
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} maintenance schedule:`, error);
      alert(error.response?.data?.message || `Failed to ${editMode ? 'update' : 'create'} maintenance schedule`);
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
    'Finishing', 'Dyeing', 'Warping', 'Inspection',
    'Weft Knitting', 'Warp Knitting', 'Printing', 'Utility'
  ];

  const frequencies = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];
  
  const pmTeams = Array.from({length: 20}, (_, i) => `PMT-${(i + 1).toString().padStart(2, '0')}`);
  
  const checkTypes = ['A-Check', 'B-Check', 'C-Check','D-Check','E-Check','F-Check','G-Check','H-Check','I-Check','J-Check','K-Check','Annual MTC'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl">

        {/* Navigation Menu */}
        <nav className="mt-5">
          <ul className="space-y-2">
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/Machine_view")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">
                View Machines
              </span>
            </li>

            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/View_Maintenance_Schedule")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">
                View Maintenance Schedule
              </span>
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
              {editMode ? 'Edit Maintenance Schedule' : 'Machine Maintenance Schedule'}
            </h1>
            <p className="text-gray-600 text-xs">
              {editMode ? 'Update machine maintenance details' : 'Schedule and manage machine maintenance activities'}
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
                  {loading ? (editMode ? 'Updating...' : 'Saving...') : (editMode ? 'Update Schedule' : 'Save Schedule')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}