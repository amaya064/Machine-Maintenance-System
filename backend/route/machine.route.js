import express from 'express';
import { createMaintenanceSchedule, deleteMachine, deleteMaintenanceSchedule, getAllMachines, getAllMaintenanceSchedules, registerMachine, updateMachine, updateMaintenanceSchedule } from '../controller/machine.controller.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure multer for file uploads
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "pdf/");
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, "pdfFile-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const router = express.Router();

// POST: Register Employee
router.post('/register', registerMachine);
router.get('/', getAllMachines);
router.delete('/:id', deleteMachine);
router.post('/create', upload.single('pdfFile'), createMaintenanceSchedule); // Add upload middleware
router.put('/:id', updateMachine);
router.get('/schedules', getAllMaintenanceSchedules);
router.delete('/schedules/:id', deleteMaintenanceSchedule);
router.put('/schedules/:id', upload.single('pdfFile'), updateMaintenanceSchedule); // Add upload middleware

export default router;