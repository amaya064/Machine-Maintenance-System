import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema(
  {
    machineName: { type: String, required: true },
    department: { type: String, required: true },
    technicianName: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    prNumber: { type: String, required: true },
    poNumber: { type: String, required: true },
    manufactureDate: { type: Date, required: true },
    installationDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Machine', machineSchema);
