import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FaTools, 
  FaUser, 
  FaCalendar, 
  FaCog, 
  FaBuilding,
  FaHashtag,
  FaBarcode,
  FaFileAlt,
  FaShoppingCart,
  FaTrash,
  FaIndustry,
  FaPlusCircle,
  FaEdit,
  FaEye
} from "react-icons/fa";

export default function Machine_view() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/machines");
        setMachines(response.data.data);
      } catch (error) {
        console.error("Error fetching machines:", error);
        alert("Failed to fetch machines. Please check if the server is running.");
      }
    };

    fetchMachines();
  }, []);

  // Sort machines
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedMachines = React.useMemo(() => {
    if (!sortConfig.key) return machines;
    
    return [...machines].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [machines, sortConfig]);

  // Remove machine handler
  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this machine?")) {
      try {
        await axios.delete(`http://localhost:3000/api/machines/${id}`);
        setMachines(machines.filter((machine) => machine._id !== id));
        alert("Machine removed successfully.");
      } catch (error) {
        console.error("Error removing machine:", error);
        alert("Failed to remove machine.");
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
              className="flex items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer transition-all group"
              onClick={() => navigate("/New_machine_registration")}
            >
              <FaCog className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">Register Machine</span>
            </li>
            <li
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
            >
              <FaTools className="text-teal-300 text-sm mr-2" />
              <span className="text-sm text-gray-200">View Machines</span>
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
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Registered Machines
              </h1>
              <p className="text-gray-600 text-sm">Manage all your industrial equipment</p>
            </div>
            <button
              onClick={() => navigate("/New_machine_registration")}
              className="inline-flex items-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-sm text-sm"
            >
              <FaPlusCircle className="mr-2 text-xs" />
              Add New Machine
            </button>
          </div>

          {machines.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-3">🏭</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No machines found</h3>
              <p className="text-gray-500 text-sm mb-5">Get started by registering your first machine</p>
              <button
                onClick={() => navigate("/New_machine_registration")}
                className="inline-flex items-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-sm text-sm"
              >
                <FaPlusCircle className="mr-2 text-xs" />
                Register Machine
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('machineName')}
                      >
                        <div className="flex items-center">
                          Machine Name
                          {sortConfig.key === 'machineName' && (
                            <span className="ml-1 text-teal-500">
                              {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('department')}
                      >
                        <div className="flex items-center">
                          Department
                          {sortConfig.key === 'department' && (
                            <span className="ml-1 text-teal-500">
                              {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('technicianName')}
                      >
                        <div className="flex items-center">
                          Technician
                          {sortConfig.key === 'technicianName' && (
                            <span className="ml-1 text-teal-500">
                              {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model & Serial
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference Numbers
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedMachines.map((machine) => (
                      <tr key={machine._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center mr-3">
                              <FaIndustry className="text-teal-600 text-xs" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {machine.machineName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                            {machine.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUser className="text-teal-500 mr-2 text-xs" />
                            <span className="text-sm text-gray-900">{machine.technicianName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium">{machine.model}</div>
                            <div className="text-xs text-gray-500 font-mono">{machine.serialNumber}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <FaFileAlt className="text-teal-500 mr-1 text-xs" />
                              <span>PR: {machine.prNumber}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <FaShoppingCart className="text-teal-500 mr-1 text-xs" />
                              <span>PO: {machine.poNumber}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <FaCalendar className="text-teal-500 mr-1 text-xs" />
                              <span className="text-xs">{formatDate(machine.manufactureDate)}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <FaCalendar className="text-teal-500 mr-1 text-xs" />
                              <span className="text-xs">{formatDate(machine.installationDate)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/machine-details/${machine._id}`)}
                              className="text-teal-600 hover:text-teal-900 p-1.5 rounded hover:bg-teal-50 transition-colors"
                              title="View Details"
                            >
                              <FaEye className="text-xs" />
                            </button>
                            <button
  onClick={() => navigate(`/New_machine_registration/${machine._id}`)}
  className="text-blue-600 hover:text-blue-900 p-1.5 rounded hover:bg-blue-50 transition-colors"
  title="Edit Machine"
>
  <FaEdit className="text-xs" />
</button>
                            <button
                              onClick={() => handleRemove(machine._id)}
                              className="text-red-600 hover:text-red-900 p-1.5 rounded hover:bg-red-50 transition-colors"
                              title="Delete Machine"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}