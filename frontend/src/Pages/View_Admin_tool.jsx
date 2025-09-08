import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FaClipboardCheck,
  FaCalendar,
  FaClock,
  FaTools,
  FaUserTie,
  FaUser,
  FaFileAlt,
  FaSave,
  FaIndustry,
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle
} from 'react-icons/fa';

export default function View_Admin_tool() {
  const navigate = useNavigate();
  const [breakdowns, setBreakdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch breakdown records from database
  useEffect(() => {
    const fetchBreakdowns = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/breakdowns');
        setBreakdowns(response.data.data);
        setError('');
      } catch (error) {
        console.error('Error fetching breakdown records:', error);
        setError('Failed to fetch breakdown records. Please check if the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchBreakdowns();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    // Convert HH:MM to 12-hour format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: FaSpinner },
      'In Progress': { color: 'bg-blue-100 text-blue-800', icon: FaSpinner },
      'Completed': { color: 'bg-green-100 text-green-800', icon: FaCheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig['Pending'];
    const IconComponent = config.icon;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${config.color}`}>
        <IconComponent className="text-xs" />
        {status}
      </span>
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this breakdown record?')) {
      try {
        await axios.delete(`http://localhost:3000/api/breakdowns/${id}`);
        setBreakdowns(breakdowns.filter(breakdown => breakdown._id !== id));
        alert('Breakdown record deleted successfully!');
      } catch (error) {
        console.error('Error deleting breakdown record:', error);
        alert('Failed to delete breakdown record.');
      }
    }
  };

const handleEdit = (breakdown) => {
  // Navigate to the Pm_admin_tool page with the breakdown data
  navigate("/Pm_admin_tool", { 
    state: { 
      editMode: true, 
      breakdownData: breakdown 
    } 
  });
};

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/breakdowns/${id}`,
        { status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Update the local state
        setBreakdowns(breakdowns.map(breakdown => 
          breakdown._id === id ? { ...breakdown, status: newStatus } : breakdown
        ));
        alert('Status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
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
            <p className="text-gray-600 mt-3">Loading breakdown records...</p>
          </div>
        </main>
      </div>
    );
  }

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
                                              className="flex items-center p-3  bg-gray-700 rounded-md cursor-pointer transition-all group"
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

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <div className="max-w-7xl mx-auto">
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
                  Breakdown Records
                </h1>
                <p className="text-gray-600 text-xs">
                  View and manage all machine breakdown records
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/pm-admin-tool")}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all flex items-center text-xs"
            >
              <FaTools className="mr-2" />
              Create New
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Breakdown Records Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {breakdowns.length === 0 ? (
              <div className="text-center py-12">
                <FaTools className="text-gray-300 text-4xl mx-auto mb-3" />
                <h3 className="text-gray-600 font-medium mb-1">No breakdown records found</h3>
                <p className="text-gray-500 text-sm">Create your first breakdown record to get started.</p>
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
                        Breakdown Date/Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fixed Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Personnel
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {breakdowns.map((breakdown) => (
                      <tr key={breakdown._id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {breakdown.machineName}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {breakdown.description}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            <div>{formatDate(breakdown.breakdownDate)}</div>
                            <div className="text-gray-500">{formatTime(breakdown.breakdownTime)}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {formatDate(breakdown.scheduleDate)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {breakdown.fixedDate ? formatDate(breakdown.fixedDate) : 'Not fixed yet'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            <div><strong>Exec:</strong> {breakdown.executiveName}</div>
                            <div><strong>Mgr:</strong> {breakdown.managerName}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">
                            {getStatusBadge(breakdown.status)}
                            <select
                              value={breakdown.status}
                              onChange={(e) => handleStatusUpdate(breakdown._id, e.target.value)}
                              className="text-xs border border-gray-300 rounded p-1 focus:ring-1 focus:ring-teal-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(breakdown)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(breakdown._id)}
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
          {breakdowns.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {breakdowns.length} breakdown record(s)
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 