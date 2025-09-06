// model/MaintenanceSchedule.model.js
import mongoose from 'mongoose';

const maintenanceScheduleSchema = new mongoose.Schema(
  {
    month: { 
      type: String, 
      required: true,
      enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    department: { 
      type: String, 
      required: true,
      enum: ['Maintenance', 'Production', 'Quality Control', 'Engineering', 'Operations', 'Technical Support', 'Facilities', 'Health & Safety']
    },
    machineName: { 
      type: String, 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    nextScheduleDate: { 
      type: Date, 
      required: true 
    },
    frequency: { 
      type: String, 
      required: true,
      enum: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly']
    },
    pmTeam: { 
      type: String, 
      required: true,
      enum: Array.from({length: 20}, (_, i) => `PMT-${(i + 1).toString().padStart(2, '0')}`)
    },
    checkType: { 
      type: String, 
      required: true,
      enum: ['A-Check', 'B-Check', 'C-Check']
    }
  },
  { timestamps: true }
);

export default mongoose.model('MaintenanceSchedule', maintenanceScheduleSchema);