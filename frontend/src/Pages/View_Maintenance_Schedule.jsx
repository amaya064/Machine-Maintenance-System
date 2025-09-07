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
  FaIndustry,
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowLeft
} from 'react-icons/fa';

export default function View_Maintenance_Schedule() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch maintenance schedules from database
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/machines/schedules');
        setSchedules(response.data.data);
        setError('');
      } catch (error) {
        console.error('Error fetching maintenance schedules:', error);
        setError('Failed to fetch maintenance schedules. Please check if the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await axios.delete(`http://localhost:3000/api/machines/schedules/${id}`);
        setSchedules(schedules.filter(schedule => schedule._id !== id));
        alert('Schedule deleted successfully!');
      } catch (error) {
        console.error('Error deleting schedule:', error);
        alert('Failed to delete schedule.');
      }
    }
  };

  const handleEdit = (schedule) => {
    // Navigate to the edit page with the schedule data
    navigate('/Machine_maintenance_schedule', { 
      state: { 
        editMode: true, 
        scheduleData: schedule 
      } 
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl">
          {/* Sidebar content same as before */}
        </aside>
        <main className="flex-1 p-5 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
            <p className="text-gray-600 mt-3">Loading schedules...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl">
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
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/Machine_maintenance_schedule")}
            >
              <FaCalendar className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">Maintenance Schedule</span>
            </li>
            <li
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
            >
              <FaTools className="text-teal-300 text-sm mr-2" />
              <span className="text-sm text-gray-200">View Maintenance Schedule</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <FaArrowLeft className="text-gray-700" />
              </button>
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
                <FaEye className="text-white text-lg" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-800">
                  Maintenance Schedules
                </h1>
                <p className="text-gray-600 text-xs">
                  View and manage all maintenance schedules
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/Machine_maintenance_schedule")}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all flex items-center text-xs"
            >
              <FaCalendar className="mr-2" />
              Create New
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Schedules Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {schedules.length === 0 ? (
              <div className="text-center py-12">
                <FaCalendar className="text-gray-300 text-4xl mx-auto mb-3" />
                <h3 className="text-gray-600 font-medium mb-1">No schedules found</h3>
                <p className="text-gray-500 text-sm">Create your first maintenance schedule to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Machine
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PM Team
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule Dates
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {schedules.map((schedule) => (
                      <tr key={schedule._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {schedule.machineName}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {schedule.department}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {schedule.month}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {schedule.pmTeam}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {schedule.checkType}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div>Start: {formatDate(schedule.startDate)}</div>
                            <div>End: {formatDate(schedule.endDate)}</div>
                            <div>Next: {formatDate(schedule.nextScheduleDate)}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                            {schedule.frequency}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(schedule)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(schedule._id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination or additional info */}
          {schedules.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {schedules.length} maintenance schedule(s)
            </div>
          )}
        </div>
      </main>
    </div>
  );
}