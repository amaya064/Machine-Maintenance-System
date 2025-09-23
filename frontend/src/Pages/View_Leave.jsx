import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUser,
  FaClipboardList,
  FaTools,
  FaClipboardCheck,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

export default function View_Leave() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLeaveType, setFilterLeaveType] = useState('');

  // Fetch leaves on component mount
  useEffect(() => {
    fetchLeaves();
  }, []);

  // Filter leaves based on search and filter criteria
  useEffect(() => {
    filterLeaves();
  }, [leaves, searchTerm, filterStatus, filterLeaveType]);

  const fetchLeaves = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/employees/leaves');
      const data = await response.json();
      
      if (data.success) {
        setLeaves(data.data);
        setLoading(false);
      } else {
        setError('Failed to fetch leave records');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setError('Error fetching leave records');
      setLoading(false);
    }
  };

  const filterLeaves = () => {
    let filtered = leaves;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(leave => 
        leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.epfNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus) {
      filtered = filtered.filter(leave => leave.status === filterStatus);
    }

    // Apply leave type filter
    if (filterLeaveType) {
      filtered = filtered.filter(leave => leave.leaveType === filterLeaveType);
    }

    setFilteredLeaves(filtered);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleUpdateStatus = async (leaveId, newStatus) => {
    try {
      // You would need to create an update endpoint in your backend
      const response = await fetch(`http://localhost:3000/api/employees/leaves/${leaveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the leaves list
        fetchLeaves();
      } else {
        setError('Failed to update leave status');
      }
    } catch (error) {
      console.error('Error updating leave status:', error);
      setError('Error updating leave status');
    }
  };

  const handleDeleteLeave = async (leaveId) => {
    if (window.confirm('Are you sure you want to delete this leave record?')) {
      try {
        // You would need to create a delete endpoint in your backend
        const response = await fetch(`http://localhost:3000/api/employees/leaves/${leaveId}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
          // Refresh the leaves list
          fetchLeaves();
        } else {
          setError('Failed to delete leave record');
        }
      } catch (error) {
        console.error('Error deleting leave:', error);
        setError('Error deleting leave record');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leave records...</p>
        </div>
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
              onClick={() => navigate("/Machine_view")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View Machines</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/View_Maintenance_Schedule")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View Maintenance Schedule</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/view_Admin_tool")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View Admin tool</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/View_Post_Evaluation")}
            >
              <FaClipboardCheck className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View PM Evaluations</span>
            </li>
            <li
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
            >
              <FaClipboardList className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View Leave Records</span>
            </li>

            

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl mb-3">
              <FaClipboardList className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Leave Records</h1>
            <p className="text-gray-600 text-sm">View and manage all leave applications</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-xs" />
                </div>
                <input
                  type="text"
                  placeholder="Search leaves..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 text-xs mr-2" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 text-xs mr-2" />
                  <select
                    value={filterLeaveType}
                    onChange={(e) => setFilterLeaveType(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Leave Types</option>
                    <option value="Annual">Annual</option>
                    <option value="Sick">Sick</option>
                    <option value="Casual">Casual</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <button
                  onClick={fetchLeaves}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 transition-all text-sm"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>

          {/* Leaves Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredLeaves.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No leave records found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        EPF Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leave Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Range
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeaves.map((leave) => (
                      <tr key={leave._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{leave.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{leave.epfNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{leave.leaveType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {leave.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(leave.status)}`}>
                            {leave.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateStatus(leave._id, 'Approved')}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(leave._id, 'Rejected')}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDeleteLeave(leave._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash className="text-sm" />
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
        </div>
      </main>
    </div>
  );
}