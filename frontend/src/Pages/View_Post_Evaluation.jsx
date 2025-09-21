import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaIndustry,
  FaBuilding,
  FaCog,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaFilePdf,
  FaImage,
  FaCalendarAlt,
  FaStickyNote,
  FaTools,
  FaEye,
  FaSearch,
  FaFilter,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function View_Post_Evaluation() {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterCheckType, setFilterCheckType] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editFiles, setEditFiles] = useState({ pdfFile: null, imageFile: null });
  const [saveLoading, setSaveLoading] = useState(false);

  // Departments and check types for dropdowns
  const departments = ["Finishing", "Dyeing", "Warping", "Inspection", "Weft Knitting", "Warp Knitting", "Printing", "Utility"];
  const checkTypes = ["A-Check", "B-Check", "C-Check", "D-Check", "E-Check", "F-Check", "G-Check", "H-Check", "I-Check", "J-Check", "K-Check", "Annual MTC"];
  const maintenanceTypes = ["shutdown", "specialMaintenance"];

  // Fetch evaluations from backend
  useEffect(() => {
    fetchEvaluations();
  }, []);

  useEffect(() => {
    filterEvaluations();
  }, [evaluations, searchTerm, filterDepartment, filterCheckType]);

  const fetchEvaluations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/pm-evaluations");
      setEvaluations(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      setError("Failed to load evaluations");
      setLoading(false);
    }
  };

  const filterEvaluations = () => {
    let filtered = evaluations;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(evaluation => 
        evaluation.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.checkType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (filterDepartment) {
      filtered = filtered.filter(evaluation => 
        evaluation.department === filterDepartment
      );
    }

    // Apply check type filter
    if (filterCheckType) {
      filtered = filtered.filter(evaluation => 
        evaluation.checkType === filterCheckType
      );
    }

    setFilteredEvaluations(filtered);
  };

  const handleViewDetails = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setEditFormData(evaluation);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this evaluation?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/pm-evaluations/${id}`);
      alert("Evaluation deleted successfully");
      fetchEvaluations(); // Refresh the list
    } catch (error) {
      console.error("Error deleting evaluation:", error);
      alert("Failed to delete evaluation");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(selectedEvaluation);
    setEditFiles({ pdfFile: null, imageFile: null });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEditFiles(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSaveEdit = async () => {
    setSaveLoading(true);
    try {
      const formData = new FormData();
      
      // Append all form data
      Object.keys(editFormData).forEach(key => {
        if (key !== 'pdfPath' && key !== 'imagePath' && key !== '_id' && key !== '__v' && key !== 'createdAt') {
          formData.append(key, editFormData[key]);
        }
      });

      // Append files if they exist
      if (editFiles.pdfFile) {
        formData.append('pdfFile', editFiles.pdfFile);
      }
      if (editFiles.imageFile) {
        formData.append('imageFile', editFiles.imageFile);
      }

      const response = await axios.put(
        `http://localhost:3000/api/pm-evaluations/${selectedEvaluation._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Evaluation updated successfully");
      setIsEditing(false);
      setShowModal(false);
      fetchEvaluations(); // Refresh the list
    } catch (error) {
      console.error("Error updating evaluation:", error);
      alert("Failed to update evaluation");
    } finally {
      setSaveLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateForInput = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading evaluations...</p>
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
              onClick={() => navigate("/PM_Post_Evaluation")}
            >
              <FaClipboardCheck className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">
                Create Evaluation
              </span>
            </li>
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
              className="flex items-center p-3 bg-gray-700 rounded-md cursor-pointer transition-all group"
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
              <span className="text-sm group-hover:text-gray-200">View Leave Records</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl mb-4">
              <FaIndustry className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              PM Evaluation Records
            </h1>
            <p className="text-gray-600 text-sm">
              View and manage preventive maintenance evaluations
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center text-sm">
              <FaExclamationTriangle className="mr-2 text-red-500 text-xs" />
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
                  placeholder="Search evaluations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 text-xs mr-2" />
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 text-xs mr-2" />
                  <select
                    value={filterCheckType}
                    onChange={(e) => setFilterCheckType(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Check Types</option>
                    {checkTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <button
                  onClick={fetchEvaluations}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-2 rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 transition-all text-sm"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>

          {/* Evaluations Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredEvaluations.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No evaluations found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Machine
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Schedule Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Maintenance Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attachments
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEvaluations.map((evaluation) => (
                      <tr key={evaluation._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{evaluation.machineName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{evaluation.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{evaluation.checkType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(evaluation.evaluationDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(evaluation.nextScheduleDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {evaluation.maintenanceType === "shutdown" ? "Shutdown" : "Special Maintenance"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {evaluation.pdfPath && (
                              <a 
                                href={`http://localhost:3000/${evaluation.pdfPath}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaFilePdf className="text-sm" />
                              </a>
                            )}
                            {evaluation.imagePath && (
                              <a 
                                href={`http://localhost:3000/${evaluation.imagePath}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FaImage className="text-sm" />
                              </a>
                            )}
                            {!evaluation.pdfPath && !evaluation.imagePath && (
                              <span className="text-xs text-gray-400">None</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleViewDetails(evaluation)}
                              className="text-teal-600 hover:text-teal-900"
                              title="View Details"
                            >
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleViewDetails(evaluation)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDelete(evaluation._id)}
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

          {/* Evaluation Detail Modal with Edit Functionality */}
          {showModal && selectedEvaluation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {isEditing ? "Edit Evaluation" : "Evaluation Details"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setIsEditing(false);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Department */}
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <FaBuilding className="text-teal-600 text-xs" />
                      {isEditing ? (
                        <select
                          name="department"
                          value={editFormData.department || ""}
                          onChange={handleEditChange}
                          className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-sm text-gray-800">{selectedEvaluation.department}</p>
                        </div>
                      )}
                    </div>

                    {/* Machine Name */}
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <FaCog className="text-teal-600 text-xs" />
                      {isEditing ? (
                        <input
                          type="text"
                          name="machineName"
                          value={editFormData.machineName || ""}
                          onChange={handleEditChange}
                          className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                          required
                        />
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Machine</p>
                          <p className="text-sm text-gray-800">{selectedEvaluation.machineName}</p>
                        </div>
                      )}
                    </div>

                    {/* Check Type */}
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <FaClipboardCheck className="text-teal-600 text-xs" />
                      {isEditing ? (
                        <select
                          name="checkType"
                          value={editFormData.checkType || ""}
                          onChange={handleEditChange}
                          className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                          required
                        >
                          <option value="">Select Check Type</option>
                          {checkTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Check Type</p>
                          <p className="text-sm text-gray-800">{selectedEvaluation.checkType}</p>
                        </div>
                      )}
                    </div>

                    {/* Special Notes */}
                    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <FaStickyNote className="text-teal-600 text-xs mt-1" />
                      {isEditing ? (
                        <textarea
                          name="specialNotes"
                          value={editFormData.specialNotes || ""}
                          onChange={handleEditChange}
                          placeholder="Enter special notes or observations"
                          className="w-full bg-transparent focus:outline-none text-gray-700 text-sm resize-none"
                          rows="3"
                        />
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Special Notes</p>
                          <p className="text-sm text-gray-800 whitespace-pre-wrap">
                            {selectedEvaluation.specialNotes || "No notes provided"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Evaluation Date */}
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <FaCalendarAlt className="text-teal-600 text-xs" />
                      {isEditing ? (
                        <input
                          type="date"
                          name="evaluationDate"
                          value={formatDateForInput(editFormData.evaluationDate) || ""}
                          onChange={handleEditChange}
                          className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                          required
                        />
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Evaluation Date</p>
                          <p className="text-sm text-gray-800">{formatDate(selectedEvaluation.evaluationDate)}</p>
                        </div>
                      )}
                    </div>

                    {/* Next Schedule Date */}
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <FaCalendarAlt className="text-teal-600 text-xs" />
                      {isEditing ? (
                        <input
                          type="date"
                          name="nextScheduleDate"
                          value={formatDateForInput(editFormData.nextScheduleDate) || ""}
                          onChange={handleEditChange}
                          className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                          required
                        />
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Next Schedule Date</p>
                          <p className="text-sm text-gray-800">{formatDate(selectedEvaluation.nextScheduleDate)}</p>
                        </div>
                      )}
                    </div>

                    {/* Maintenance Type */}
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <FaClipboardCheck className="text-teal-600 text-xs" />
                      {isEditing ? (
                        <select
                          name="maintenanceType"
                          value={editFormData.maintenanceType || ""}
                          onChange={handleEditChange}
                          className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                          required
                        >
                          <option value="">Select Maintenance Type</option>
                          {maintenanceTypes.map((type) => (
                            <option key={type} value={type}>
                              {type === "shutdown" ? "Shutdown" : "Special Maintenance"}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div>
                          <p className="text-xs text-gray-500">Maintenance Type</p>
                          <p className="text-sm text-gray-800">
                            {selectedEvaluation.maintenanceType === "shutdown" ? "Shutdown" : "Special Maintenance"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* File Uploads (Edit Mode Only) */}
                    {isEditing && (
                      <>
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <FaFilePdf className="text-teal-600 text-xs" />
                          <input
                            type="file"
                            name="pdfFile"
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="w-full bg-transparent focus:outline-none text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                          />
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <FaImage className="text-teal-600 text-xs" />
                          <input
                            type="file"
                            name="imageFile"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full bg-transparent focus:outline-none text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                          />
                        </div>
                      </>
                    )}

                    {/* Attachments (View Mode Only) */}
                    {!isEditing && (selectedEvaluation.pdfPath || selectedEvaluation.imagePath) && (
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Attachments</p>
                        <div className="flex space-x-4">
                          {selectedEvaluation.pdfPath && (
                            <a 
                              href={`http://localhost:3000/${selectedEvaluation.pdfPath}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-red-500 hover:text-red-700"
                            >
                              <FaFilePdf className="mr-1 text-sm" />
                              <span className="text-sm">View PDF</span>
                            </a>
                          )}
                          {selectedEvaluation.imagePath && (
                            <a 
                              href={`http://localhost:3000/${selectedEvaluation.imagePath}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-500 hover:text-blue-700"
                            >
                              <FaImage className="mr-1 text-sm" />
                              <span className="text-sm">View Image</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center"
                          disabled={saveLoading}
                        >
                          <FaTimes className="mr-1" /> Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm hover:from-teal-600 hover:to-cyan-600 transition-colors flex items-center"
                          disabled={saveLoading}
                        >
                          {saveLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <FaSave className="mr-1" /> Save Changes
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowModal(false)}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleEdit}
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm hover:from-teal-600 hover:to-cyan-600 transition-colors flex items-center"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}