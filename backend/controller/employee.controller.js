// controller/employee.controller.js
import Employee from '../model/employee.model.js';
import Leave from '../model/leave.model.js';

export const registerEmployee = async (req, res, next) => {
  console.log("Employee registration request received with data:", req.body);
  const { name, epfNumber, position } = req.body;

  // Validation - removed department requirement
  if (!name || !epfNumber || !position) {
    return res.status(400).json({ 
      success: false,
      message: 'All fields are required: name, EPF number, and position.' 
    });
  }

  try {
    // Check if EPF number already exists in either epfNumber or employeeId field
    const existingEmployee = await Employee.findOne({ 
      $or: [
        { epfNumber: epfNumber },
        { employeeId: epfNumber } // Check old field name for backward compatibility
      ]
    });
    
    if (existingEmployee) {
      return res.status(400).json({ 
        success: false,
        message: 'EPF number already in use.' 
      });
    }

    // Create new employee - removed department field
    const newEmployee = new Employee({
      name,
      epfNumber,
      position
    });

    await newEmployee.save();
    console.log("Employee created successfully!");
    
    res.status(201).json({ 
      success: true, 
      message: 'Employee registered successfully!',
      data: newEmployee 
    });
  } catch (error) {
    console.error("Employee registration error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      // Check if the error is due to epfNumber or employeeId field
      return res.status(400).json({
        success: false,
        message: 'EPF number already exists in the system.'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    // Generic server error
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};




export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().select('epfNumber name position').sort({ name: 1 });
    res.status(200).json({
      success: true,
      data: employees
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employees'
    });
  }
};




export const createLeave = async (req, res, next) => {
  const { epfNumber, leaveType, startDate, endDate, reason } = req.body;

  // Validation
  if (!epfNumber || !leaveType || !startDate || !endDate || !reason) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    // Get employee name from EPF number
    const employee = await Employee.findOne({ epfNumber });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Create new leave record
    const newLeave = new Leave({
      epfNumber,
      name: employee.name,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();
    
    res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully',
      data: newLeave
    });
  } catch (error) {
    console.error("Leave creation error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: leaves
    });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leave records'
    });
  }
};



export const updateLeaveStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const leave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Leave status updated successfully',
      data: leave
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({
      success: false,
      message: 'Error updating leave status'
    });
  }
};

export const deleteLeave = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leave = await Leave.findByIdAndDelete(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Leave record deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting leave:", error);
    res.status(500).json({
      success: false,
      message: 'Error deleting leave record'
    });
  }
};