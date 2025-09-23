import Machine from '../model/Machine.model.js';
import MaintenanceSchedule from '../model/MaintenanceSchedule.model.js';

// Register a new employee
export const registerMachine = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this for debugging
    
    const { 
      machineName, 
      department, 
      technicianName, 
      model, 
      serialNumber, 
      prNumber, 
      poNumber, 
      manufactureDate, 
      installationDate 
    } = req.body;
    
    // Check for required fields
    const requiredFields = [
      'machineName', 'department', 'technicianName', 'model', 
      'serialNumber', 'prNumber', 'poNumber', 'manufactureDate', 'installationDate'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Check if machine with same serial number already exists
    const existingMachine = await Machine.findOne({ serialNumber });
    if (existingMachine) {
      return res.status(409).json({ 
        success: false, 
        message: 'Machine with this serial number already exists' 
      });
    }
    
    const machine = new Machine({ 
      machineName, 
      department, 
      technicianName, 
      model, 
      serialNumber, 
      prNumber, 
      poNumber, 
      manufactureDate: new Date(manufactureDate),
      installationDate: new Date(installationDate)
    });
    
    await machine.save();

    res.status(201).json({ 
      success: true, 
      message: 'Machine registered successfully', 
      data: machine 
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Machine with this serial number already exists' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};


// Get all machines
export const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: machines });
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};


// Delete a machine
export const deleteMachine = async (req, res) => {
  try {
    const { id } = req.params;
    
    const machine = await Machine.findByIdAndDelete(id);
    
    if (!machine) {
      return res.status(404).json({ 
        success: false, 
        message: 'Machine not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Machine deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting machine:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};



export const createMaintenanceSchedule = async (req, res) => {
  try {
    const {
      month,
      department,
      machineName,
      startDate,
      endDate,
      nextScheduleDate,
      frequency,
      pmTeam,
      checkType
    } = req.body;

    // ... validation code remains the same ...

    // Handle PDF file - store only the filename, not the full path
    let pdfPath = "";
    if (req.file) {
      pdfPath = req.file.filename; // Store only the filename, not the full path
    }

    // Create new maintenance schedule
    const maintenanceSchedule = new MaintenanceSchedule({
      month,
      department,
      machineName,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      nextScheduleDate: new Date(nextScheduleDate),
      frequency,
      pmTeam,
      checkType,
      pdfPath // Now storing only filename like "pdfFile-1758648638471-575328503.pdf"
    });

    await maintenanceSchedule.save();

    res.status(201).json({ 
      success: true, 
      message: 'Maintenance schedule created successfully', 
      data: maintenanceSchedule 
    });
  } catch (error) {
    // ... error handling remains the same ...
  }
};


// Get all maintenance schedules
export const getAllMaintenanceSchedules = async (req, res) => {
  try {
    const schedules = await MaintenanceSchedule.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: schedules 
    });
  } catch (error) {
    console.error('Error fetching maintenance schedules:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

export const deleteMaintenanceSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    
    const schedule = await MaintenanceSchedule.findByIdAndDelete(id);
    
    if (!schedule) {
      return res.status(404).json({ 
        success: false, 
        message: 'Maintenance schedule not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Maintenance schedule deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting maintenance schedule:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};


export const updateMaintenanceSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      month,
      department,
      machineName,
      startDate,
      endDate,
      nextScheduleDate,
      frequency,
      pmTeam,
      checkType
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'month', 'department', 'machineName', 'startDate', 
      'endDate', 'nextScheduleDate', 'frequency', 'pmTeam', 'checkType'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Check if schedule exists
    const schedule = await MaintenanceSchedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ 
        success: false, 
        message: 'Maintenance schedule not found' 
      });
    }

    // Update the schedule
    const updatedSchedule = await MaintenanceSchedule.findByIdAndUpdate(
      id,
      {
        month,
        department,
        machineName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        nextScheduleDate: new Date(nextScheduleDate),
        frequency,
        pmTeam,
        checkType
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Maintenance schedule updated successfully', 
      data: updatedSchedule 
    });
  } catch (error) {
    console.error('Maintenance schedule update error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};


export const updateMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Convert date strings to Date objects if they exist
    if (updates.manufactureDate) {
      updates.manufactureDate = new Date(updates.manufactureDate);
    }
    if (updates.installationDate) {
      updates.installationDate = new Date(updates.installationDate);
    }

    const machine = await Machine.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!machine) {
      return res.status(404).json({ 
        success: false, 
        message: 'Machine not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Machine updated successfully', 
      data: machine 
    });
  } catch (error) {
    console.error('Update error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};
