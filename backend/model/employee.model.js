import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  epfNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  position: { 
    type: String, 
    required: true, 
    enum: ['Manager', 'Executive', 'Technician', 'Supervisor', 'Engineer', 'Specialist'] 
  },
}, { timestamps: true });

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;