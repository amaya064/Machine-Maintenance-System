import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendar, 
  FaTools, 
  FaClipboardCheck, 
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
  FaArrowLeft,
  FaFilePdf,
  FaDownload,
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  // Function to download the uploaded PDF file
  const downloadPDF = async (schedule) => {
    if (!schedule.pdfFile) {
      alert('No PDF file available for this schedule.');
      return;
    }

    try {
      // Fetch the PDF file from the server
      const response = await axios.get(`http://localhost:3000/${schedule.pdfFile}`, {
        responseType: 'blob'
      });
      
      // Create a blob from the PDF data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `Maintenance_Schedule_${schedule.machineName}_${schedule.month}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF file.');
    }
  };

  // Function to download PDF for a single record (generated)
  const downloadGeneratedPDF = (schedule) => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Maintenance Schedule Details', 14, 22);
    
    // Add details
    doc.setFontSize(12);
    let yPosition = 40;
    
    const details = [
      { label: 'Machine Name', value: schedule.machineName },
      { label: 'Department', value: schedule.department },
      { label: 'Month', value: schedule.month },
      { label: 'PM Team', value: schedule.pmTeam },
      { label: 'Check Type', value: schedule.checkType },
      { label: 'Start Date', value: formatDate(schedule.startDate) },
      { label: 'End Date', value: formatDate(schedule.endDate) },
      { label: 'Next Schedule Date', value: formatDate(schedule.nextScheduleDate) },
      { label: 'Frequency', value: schedule.frequency },
      { label: 'Created At', value: formatDate(schedule.createdAt || new Date()) }
    ];
    
    details.forEach(detail => {
      doc.setFont(undefined, 'bold');
      doc.text(`${detail.label}:`, 14, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(detail.value, 60, yPosition);
      yPosition += 10;
    });
    
    // Save the PDF
    doc.save(`Maintenance_Schedule_${schedule.machineName}_${schedule.month}.pdf`);
  };

  
// Function to download PDF for all records
const downloadAllPDF = () => {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('ALL MAINTENANCE SCHEDULES', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });
    
    if (schedules.length === 0) {
      doc.setFontSize(12);
      doc.text('No maintenance schedules found', 105, 40, { align: 'center' });
      doc.save('All_Maintenance_Schedules.pdf');
      return;
    }
    
    // Create a simple table without autoTable
    let yPosition = 40;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    const rowHeight = 10;
    
    // Table headers
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Machine', margin, yPosition);
    doc.text('Department', margin + 40, yPosition);
    doc.text('Month', margin + 80, yPosition);
    doc.text('PM Team', margin + 100, yPosition);
    doc.text('Check Type', margin + 130, yPosition);
    doc.text('Start Date', margin + 160, yPosition);
    yPosition += rowHeight;
    
    // Draw line under headers
    doc.line(margin, yPosition - 5, 200, yPosition - 5);
    
    // Table rows
    doc.setFont(undefined, 'normal');
    schedules.forEach((schedule, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.text(schedule.machineName || 'N/A', margin, yPosition);
      doc.text(schedule.department || 'N/A', margin + 40, yPosition);
      doc.text(schedule.month || 'N/A', margin + 80, yPosition);
      doc.text(schedule.pmTeam || 'N/A', margin + 100, yPosition);
      doc.text(schedule.checkType || 'N/A', margin + 130, yPosition);
      doc.text(formatDate(schedule.startDate) || 'N/A', margin + 160, yPosition);
      
      yPosition += rowHeight;
      
      // Add additional info on next line
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.text(`End: ${formatDate(schedule.endDate) || 'N/A'}`, margin, yPosition);
      doc.text(`Next: ${formatDate(schedule.nextScheduleDate) || 'N/A'}`, margin + 40, yPosition);
      doc.text(`Freq: ${schedule.frequency || 'N/A'}`, margin + 80, yPosition);
      
      yPosition += rowHeight + 5;
      
      // Add separator line
      if (index < schedules.length - 1) {
        doc.line(margin, yPosition - 2, 200, yPosition - 2);
        yPosition += 5;
      }
    });
    
    // Save the PDF
    doc.save('All_Maintenance_Schedules.pdf');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please check the console for details.');
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
              onClick={() => navigate("/Machine_view")}
            >
              <FaTools className="text-teal-400 text-sm mr-2 group-hover:text-teal-300" />
              <span className="text-sm group-hover:text-gray-200">
                View Machines
              </span>
            </li>

            <li
              className="flex items-center p-3  bg-gray-700 rounded-md cursor-pointer transition-all group"
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
              <span className="text-sm group-hover:text-gray-200">View Leave Records</span>
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
            <div className="flex space-x-2">
              {/* All PDF Button */}
              {schedules.length > 0 && (
                <button
                  onClick={downloadAllPDF}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center text-xs"
                >
                  <FaFilePdf className="mr-2" />
                  All PDF
                </button>
              )}
              <button
                onClick={() => navigate("/Machine_maintenance_schedule")}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all flex items-center text-xs"
              >
                <FaCalendar className="mr-2" />
                Create New
              </button>
            </div>
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
                        PDF Document
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
                        <td className="px-4 py-4 whitespace-nowrap">
  {schedule.pdfFile ? (
    <a
      href={`http://localhost:3000/${schedule.pdfFile}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-600 hover:text-teal-800 flex items-center text-xs"
      title="View PDF"
    >
      <FaFilePdf className="mr-1" />
      View PDF
    </a>
  ) : (
    <span className="text-xs text-gray-500">No PDF</span>
  )}
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
                              onClick={() => downloadGeneratedPDF(schedule)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Generate PDF"
                            >
                              <FaFilePdf />
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