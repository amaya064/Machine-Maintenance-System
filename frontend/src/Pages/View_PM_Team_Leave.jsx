import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUser,
  FaClipboardList,
  FaSave,
  FaTools,
  FaClipboardCheck
} from 'react-icons/fa';

export default function View_PM_Team_Leave() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEpf, setSelectedEpf] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    leaveType: 'Annual',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Update selected employee when EPF number changes
  useEffect(() => {
    if (selectedEpf) {
      const employee = employees.find(emp => emp.epfNumber === selectedEpf);
      setSelectedEmployee(employee || null);
    } else {
      setSelectedEmployee(null);
    }
  }, [selectedEpf, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/employees');
      const data = await response.json();
      
      if (data.success) {
        setEmployees(data.data);
      } else {
        setError('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Error fetching employees');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!selectedEpf) {
    setError('Please select an employee');
    return;
  }

  if (!formData.startDate || !formData.endDate || !formData.reason) {
    setError('Please fill all required fields');
    return;
  }

  if (new Date(formData.startDate) > new Date(formData.endDate)) {
    setError('End date cannot be before start date');
    return;
  }

  setLoading(true);
  setError('');
  setSuccess('');

  try {
    // CHANGE THIS LINE - use the correct endpoint
    const response = await fetch('http://localhost:3000/api/employees/leaves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        epfNumber: selectedEpf,
        ...formData
      })
    });

    const data = await response.json();

    if (data.success) {
      setSuccess('Leave application submitted successfully!');
      setFormData({
        leaveType: 'Annual',
        startDate: '',
        endDate: '',
        reason: ''
      });
      setSelectedEpf('');
      setSelectedEmployee(null);
    } else {
      setError(data.message || 'Failed to submit leave application');
    }
  } catch (error) {
    console.error('Error submitting leave:', error);
    setError('Error submitting leave application');
  } finally {
    setLoading(false);
  }
};

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
              <span className="text-sm group-hover:text-gray-200">view Admin tool</span>
            </li>
            <li
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/View_Post_Evaluation")}
            >
              <FaClipboardCheck className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">View PM Evaluations</span>
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
              <FaClipboardList className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">PM Team Leave</h1>
            <p className="text-gray-600 text-xs">Manage preventive maintenance team leave applications</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-xs rounded-lg">
              {success}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EPF Number Selection */}
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                <FaUser className="text-teal-600 text-xs ml-1" />
                <select
                  value={selectedEpf}
                  onChange={(e) => setSelectedEpf(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-gray-700 text-xs py-1"
                  required
                >
                  <option value="">Select EPF Number</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee.epfNumber}>
                      {employee.epfNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display Selected Employee Name */}
              {selectedEmployee && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Selected Employee:</strong> {selectedEmployee.name} ({selectedEmployee.position})
                  </p>
                </div>
              )}

              {/* Leave Type */}
              <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                <FaClipboardList className="text-teal-600 text-xs ml-1" />
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="w-full bg-transparent focus:outline-none text-gray-700 text-xs py-1"
                  required
                >
                  <option value="Annual">Annual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                  <FaCalendarAlt className="text-teal-600 text-xs ml-1" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-xs py-1"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                  <FaCalendarAlt className="text-teal-600 text-xs ml-1" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-xs py-1"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 group focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-100 transition-all">
                <FaClipboardList className="text-teal-600 text-xs mt-1" />
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Reason for leave"
                  className="w-full bg-transparent focus:outline-none text-gray-700 text-xs py-1 resize-none"
                  rows="3"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-xs hover:from-teal-600 hover:to-cyan-600 transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2 inline-block text-xs" />
                    Submit Leave Application
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