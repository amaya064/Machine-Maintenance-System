import React, { useState } from "react";
import axios from "axios";
import {
  FaIndustry,
  FaBuilding,
  FaCog,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaPlusCircle,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PM_Post_Evaluation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    machineName: "",
    department: "",
    checkType: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sample dropdown data (replace with API fetch later)
  const departments = ["Production", "Packaging", "Quality"];
  const machines = {
    Production: ["Lathe Machine", "Milling Machine", "Drill Press"],
    Packaging: ["Conveyor Belt", "Sealing Machine"],
    Quality: ["Testing Rig", "X-Ray Scanner"],
  };
  const checkTypes = ["Visual Inspection", "Functional Test", "Safety Check"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/pm-evaluation",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      alert(response.data.message || "PM Evaluation saved successfully");
      navigate("/View_PM_Evaluations"); // redirect to view page
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
              onClick={() => navigate("/View_PM_Evaluations")}
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

                {/* Machine Dropdown (depends on department) */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaCog className="text-teal-600 text-xs" />
                  <select
                    name="machineName"
                    value={formData.machineName}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                    required
                    disabled={!formData.department}
                  >
                    <option value="">Select Machine</option>
                    {formData.department &&
                      machines[formData.department]?.map((m) => (
                        <option key={m} value={m}>
                          {m}
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
