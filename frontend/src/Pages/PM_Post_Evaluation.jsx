import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaIndustry,
  FaBuilding,
  FaCog,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaPlusCircle,
  FaFilePdf,
  FaImage,
  FaCalendarAlt,
  FaStickyNote,
  FaTools
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PM_Post_Evaluation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    department: "",
    machineName: "",
    checkType: "",
    specialNotes: "",
    evaluationDate: new Date().toISOString().split('T')[0],
    pdfFile: null,
    imageFile: null
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments] = useState([
    "Production", 
    "Packaging", 
    "Quality", 
    "Maintenance",
    "Warehouse"
  ]);
  const [machines, setMachines] = useState([]);
  const [checkTypes] = useState([
    "Visual Inspection", 
    "Functional Test", 
    "Safety Check",
    "Lubrication Check",
    "Calibration Check"
  ]);

  // Fetch machines from backend
  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/machines");
      setMachines(response.data.data);
    } catch (error) {
      console.error("Error fetching machines:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "pdfFile" || e.target.name === "imageFile") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Create FormData for file upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/pm-evaluations",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000, // Longer timeout for file uploads
        }
      );

      alert(response.data.message || "PM Evaluation saved successfully");
      navigate("/View_PM_Evaluations");
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response) {
        setError(error.response.data.message || "Operation failed");
        alert(error.response.data.message || "Operation failed");
      } else if (error.request) {
        setError("No response from server. Please check if the server is running.");
        alert("No response from server. Please check if the server is running.");
      } else {
        setError(error.message || "Something went wrong");
        alert(error.message || "Something went wrong");
      }
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
              <span className="text-sm group-hover:text-gray-200">View PM Evaluations</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl mb-4">
              <FaIndustry className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              PM Post Evaluation
            </h1>
            <p className="text-gray-600 text-sm">
              Record preventive maintenance post evaluation
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center text-sm">
              <FaExclamationTriangle className="mr-2 text-red-500 text-xs" />
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {/* Department Dropdown */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaBuilding className="text-teal-600 text-xs" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
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
                </div>

                {/* Machine Dropdown */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaCog className="text-teal-600 text-xs" />
                  <select
                    name="machineName"
                    value={formData.machineName}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                    required
                  >
                    <option value="">Select Machine</option>
                    {machines.map((machine) => (
                      <option key={machine._id} value={machine.machineName}>
                        {machine.machineName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check Type Dropdown */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaClipboardCheck className="text-teal-600 text-xs" />
                  <select
                    name="checkType"
                    value={formData.checkType}
                    onChange={handleChange}
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
                </div>

                {/* Special Notes */}
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaStickyNote className="text-teal-600 text-xs mt-1" />
                  <textarea
                    name="specialNotes"
                    value={formData.specialNotes}
                    onChange={handleChange}
                    placeholder="Enter special notes or observations"
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-sm resize-none"
                    rows="3"
                  />
                </div>

                {/* Date Input */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaCalendarAlt className="text-teal-600 text-xs" />
                  <input
                    type="date"
                    name="evaluationDate"
                    value={formData.evaluationDate}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                    required
                  />
                </div>

                {/* PDF Upload */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaFilePdf className="text-teal-600 text-xs" />
                  <input
                    type="file"
                    name="pdfFile"
                    onChange={handleChange}
                    accept=".pdf"
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>

                {/* Image Upload */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaImage className="text-teal-600 text-xs" />
                  <input
                    type="file"
                    name="imageFile"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaPlusCircle className="mr-2 text-xs" />
                    Save Evaluation
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