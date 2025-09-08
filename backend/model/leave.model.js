import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  epfNumber: {
    type: String,
    required: true,
    ref: 'Employee'
  },
  name: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true,
    enum: ['Annual', 'Sick', 'Casual', 'Maternity', 'Paternity', 'Other']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected']
  }
}, { timestamps: true });

const Leave = mongoose.models.Leave || mongoose.model('Leave', leaveSchema);

export default Leave;