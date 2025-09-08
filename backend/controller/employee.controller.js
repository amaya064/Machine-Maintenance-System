// controller/employee.controller.js
import Employee from '../model/employee.model.js';

export const registerEmployee = async (req, res, next) => {
  console.log("Employee registration request received with data:", req.body);
  const { name, epfNumber, department, position } = req.body;

  // Validation
  if (!name || !epfNumber || !department || !position) {
    return res.status(400).json({ 
      success: false,
      message: 'All fields are required: name, EPF number, department, and position.' 
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

    // Create new employee
    const newEmployee = new Employee({
      name,
      epfNumber,
      department,
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