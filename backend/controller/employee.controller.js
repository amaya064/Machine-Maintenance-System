// controller/employee.controller.js
import Employee from '../model/Employee.model.js'; // Fix this import

export const registerEmployee = async (req, res, next) => {
  console.log("Employee registration request received with data:", req.body);
  const { name, employeeId, department, position, email, phone } = req.body;

  try {
    // Check if employee ID already exists
    const existingEmployeeById = await Employee.findOne({ employeeId });
    if (existingEmployeeById) {
      return res.status(400).json({ message: 'Employee ID already in use.' });
    }

    // Check if email already exists
    const existingEmployeeByEmail = await Employee.findOne({ email });
    if (existingEmployeeByEmail) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create new employee
    const newEmployee = new Employee({
      name,
      employeeId,
      department,
      position,
      email,
      phone
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
    next(error);
  }
};