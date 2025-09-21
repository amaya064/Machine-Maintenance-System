import mongoose from "mongoose";

const pmEvaluationSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  machineName: {
    type: String,
    required: true
  },
  checkType: {
    type: String,
    required: true
  },
  specialNotes: {
    type: String,
    default: ""
  },
  evaluationDate: {
    type: Date,
    required: true
  },
  nextScheduleDate: {
    type: Date,
    required: true
  },
  maintenanceType: {
    type: String,
    required: true,
    enum: ["shutdown", "specialMaintenance"] // Restrict to these values
  },
  pdfPath: {
    type: String,
    default: ""
  },
  imagePath: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PMEvaluation = mongoose.model("PMEvaluation", pmEvaluationSchema);

export default PMEvaluation;