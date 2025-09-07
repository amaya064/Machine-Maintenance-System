import mongoose from 'mongoose';

const breakdownSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
      required: true,
      trim: true
    },
    breakdownDate: {
      type: Date,
      required: true
    },
    breakdownTime: {
      type: String,
      required: true
    },
    scheduleDate: {
      type: Date,
      required: true
    },
    fixedDate: {
      type: Date
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    executiveName: {
      type: String,
      required: true,
      trim: true
    },
    managerName: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Breakdown', breakdownSchema);