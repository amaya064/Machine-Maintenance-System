import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  FaCog,
  FaCalendar,
  FaClock,
  FaTools,
  FaUserTie,
  FaUser,
  FaFileAlt,
  FaSave,
  FaClipboardCheck
} from 'react-icons/fa';

export default function Pm_admin_tool() {
  const navigate = useNavigate();
  const location = useLocation();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [breakdownId, setBreakdownId] = useState('');
  const [formData, setFormData] = useState({
    machineName: '',
    breakdownDate: '',
    breakdownTime: '',
    scheduleDate: '',
    fixedDate: '',
    description: '',
    executiveName: '',
    managerName: ''
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

useEffect(() => {
  if (location.state && location.state.editMode && location.state.breakdownData) {
    setEditMode(true);
    setBreakdownId(location.state.breakdownData._id);
    
    // Format dates for input fields
    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    setFormData({
      machineName: location.state.breakdownData.machineName || '',
      breakdownDate: formatDateForInput(location.state.breakdownData.breakdownDate),
      breakdownTime: location.state.breakdownData.breakdownTime || '',
      scheduleDate: formatDateForInput(location.state.breakdownData.scheduleDate),
      fixedDate: formatDateForInput(location.state.breakdownData.fixedDate),
      description: location.state.breakdownData.description || '',
      executiveName: location.state.breakdownData.executiveName || '',
      managerName: location.state.breakdownData.managerName || ''
    });
  } else {
    // Reset to create mode if no edit data
    setEditMode(false);
    setBreakdownId('');
    setFormData({
      machineName: '',
      breakdownDate: '',
      breakdownTime: '',
      scheduleDate: '',
      fixedDate: '',
      description: '',
      executiveName: '',
      managerName: ''
    });
  }
}, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (editMode) {
        // Update existing breakdown
        response = await axios.put(
          `http://localhost:3000/api/breakdowns/${breakdownId}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // Create new breakdown
        response = await axios.post(
          'http://localhost:3000/api/breakdowns',
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      if (response.data.success) {
        alert(`Breakdown record ${editMode ? 'updated' : 'created'} successfully!`);
        // Reset form
        setFormData({
          machineName: '',
          breakdownDate: '',
          breakdownTime: '',
          scheduleDate: '',
          fixedDate: '',
          description: '',
          executiveName: '',
          managerName: ''
        });
        
        // Navigate back to view page after successful update
        if (editMode) {
          navigate('/view_Admin_tool');
        }
      }
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} breakdown record:`, error);
      alert(error.response?.data?.message || `Failed to ${editMode ? 'update' : 'create'} breakdown record`);
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

                    <li
                      className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
                      onClick={() => navigate("/view_Admin_tool")}
                    >
                      <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
                      <span className="text-sm group-hover:text-gray-200">
                        view Admin tool
                      </span>
                    </li>
                    <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/View_Post_Evaluation")}
            >
              <FaClipboardCheck className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">
                View PM Evaluations
              </span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/View_Leave")}
            >
              <FaClipboardCheck className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View leave record</span>
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
              <FaTools className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">
    {editMode ? 'Edit Breakdown Record' : 'PM Admin Tool'}
  </h1>
            <p className="text-gray-600 text-xs">
              Record and manage machine breakdown information
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Machine Selection */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaCog className="inline mr-1 text-teal-500 text-xs" />
                    Machine Name
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

                {/* Breakdown Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaCalendar className="inline mr-1 text-teal-500 text-xs" />
                    Breakdown Date
                  </label>
                  <input
                    type="date"
                    name="breakdownDate"
                    value={formData.breakdownDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* Breakdown Time */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaClock className="inline mr-1 text-teal-500 text-xs" />
                    Breakdown Time
                  </label>
                  <input
                    type="time"
                    name="breakdownTime"
                    value={formData.breakdownTime}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* Schedule Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaCalendar className="inline mr-1 text-teal-500 text-xs" />
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    name="scheduleDate"
                    value={formData.scheduleDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* Fixed Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaCalendar className="inline mr-1 text-teal-500 text-xs" />
                    Fixed Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="fixedDate"
                    value={formData.fixedDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                  />
                </div>

                {/* Executive Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaUserTie className="inline mr-1 text-teal-500 text-xs" />
                    Executive Name
                  </label>
                  <input
                    type="text"
                    name="executiveName"
                    value={formData.executiveName}
                    onChange={handleChange}
                    placeholder="Enter executive name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* Manager Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaUser className="inline mr-1 text-teal-500 text-xs" />
                    Manager Name
                  </label>
                  <input
                    type="text"
                    name="managerName"
                    value={formData.managerName}
                    onChange={handleChange}
                    placeholder="Enter manager name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700">
                    <FaFileAlt className="inline mr-1 text-teal-500 text-xs" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter breakdown description"
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                    required
                  />
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
  {loading ? (editMode ? 'Updating...' : 'Saving...') : (editMode ? 'Update Breakdown Record' : 'Save Breakdown Record')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}