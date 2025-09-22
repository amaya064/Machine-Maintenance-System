import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTools,
  FaClipboardCheck
} from 'react-icons/fa';

export default function Pre_Check_List() {
  const [employees, setEmployees] = useState([
    { id: 1, epf: '31', name: 'John Doe', team: 'Ex', status: null },
    { id: 2, epf: '453', name: 'Jane Smith', team: 'Technician', status: null },
    { id: 3, epf: '1159', name: 'Mike Johnson', team: 'Technician', status: null },
    { id: 4, epf: '646', name: 'Sarah Wilson', team: 'Technician', status: null },
    { id: 5, epf: '42', name: 'David Brown', team: 'Supervisor', status: null },
    { id: 5, epf: '42', name: 'David Brown', team: 'Supervisor', status: null },
    { id: 5, epf: '42', name: 'David Brown', team: 'Supervisor', status: null },
  ]);

  const navigate = useNavigate();

  const handleStatusChange = (id, status) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === id ? { ...employee, status } : employee
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', employees);
    // Here you would typically send the data to your backend
    alert('Pre-check list submitted successfully!');
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

            <li
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
            >
              <FaClipboardCheck className="text-teal-300 text-sm mr-2" />
              <span className="text-sm">View Pre check list</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Pre-Check List</h1>
                <p className="text-gray-600">Verify employee status with the checklist below</p>
              </div>
              
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Export
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Add New
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">EPF Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Team</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.epf}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {employee.team}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name={`status-${employee.id}`}
                                value="ok"
                                checked={employee.status === 'ok'}
                                onChange={() => handleStatusChange(employee.id, 'ok')}
                                className="h-5 w-5 text-green-500 focus:ring-green-400"
                              />
                              <span className="ml-2 text-sm text-gray-700">OK</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name={`status-${employee.id}`}
                                value="no"
                                checked={employee.status === 'no'}
                                onChange={() => handleStatusChange(employee.id, 'no')}
                                className="h-5 w-5 text-red-500 focus:ring-red-400"
                              />
                              <span className="ml-2 text-sm text-gray-700">No</span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{employees.length}</span> of{' '}
                    <span className="font-medium">{employees.length}</span> results
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Next
                  </button>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
                  >
                    Submit Pre-Check List
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2023 Company Name. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}