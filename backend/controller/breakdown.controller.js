import Breakdown from '../model/Breakdown.model.js';
import Machine from '../model/Machine.model.js';

// Create a new breakdown record
export const createBreakdown = async (req, res) => {
  try {
    const {
      machineName,
      breakdownDate,
      breakdownTime,
      scheduleDate,
      fixedDate,
      description,
      executiveName,
      managerName
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'machineName', 'breakdownDate', 'breakdownTime', 
      'scheduleDate', 'description', 'executiveName', 'managerName'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Check if machine exists
    const machineExists = await Machine.findOne({ machineName });
    if (!machineExists) {
      return res.status(404).json({ 
        success: false, 
        message: 'Machine not found in database' 
      });
    }

    // Create new breakdown record
    const breakdown = new Breakdown({
      machineName,
      breakdownDate: new Date(breakdownDate),
      breakdownTime,
      scheduleDate: new Date(scheduleDate),
      fixedDate: fixedDate ? new Date(fixedDate) : null,
      description,
      executiveName,
      managerName
    });

    await breakdown.save();

    res.status(201).json({ 
      success: true, 
      message: 'Breakdown record created successfully', 
      data: breakdown 
    });
  } catch (error) {
    console.error('Breakdown creation error:', error);
    
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

// Get all breakdown records
export const getAllBreakdowns = async (req, res) => {
  try {
    const breakdowns = await Breakdown.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: breakdowns 
    });
  } catch (error) {
    console.error('Error fetching breakdowns:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get breakdown by ID
export const getBreakdownById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const breakdown = await Breakdown.findById(id);
    
    if (!breakdown) {
      return res.status(404).json({ 
        success: false, 
        message: 'Breakdown record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: breakdown 
    });
  } catch (error) {
    console.error('Error fetching breakdown:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update breakdown record
export const updateBreakdown = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Convert date strings to Date objects if they exist
    if (updates.breakdownDate) {
      updates.breakdownDate = new Date(updates.breakdownDate);
    }
    if (updates.scheduleDate) {
      updates.scheduleDate = new Date(updates.scheduleDate);
    }
    if (updates.fixedDate) {
      updates.fixedDate = new Date(updates.fixedDate);
    }

    const breakdown = await Breakdown.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!breakdown) {
      return res.status(404).json({ 
        success: false, 
        message: 'Breakdown record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Breakdown record updated successfully', 
      data: breakdown 
    });
  } catch (error) {
    console.error('Breakdown update error:', error);
    
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

// Delete breakdown record
export const deleteBreakdown = async (req, res) => {
  try {
    const { id } = req.params;
    
    const breakdown = await Breakdown.findByIdAndDelete(id);
    
    if (!breakdown) {
      return res.status(404).json({ 
        success: false, 
        message: 'Breakdown record not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Breakdown record deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting breakdown:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};