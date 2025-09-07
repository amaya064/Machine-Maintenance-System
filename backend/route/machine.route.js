import express from 'express';
import { createMaintenanceSchedule, deleteMachine, deleteMaintenanceSchedule, getAllMachines, getAllMaintenanceSchedules, registerMachine, updateMachine } from '../controller/machine.controller.js';

const router = express.Router();

// POST: Register Employee
router.post('/register', registerMachine);
router.get('/', getAllMachines);
router.delete('/:id', deleteMachine);
router.post('/create', createMaintenanceSchedule);
router.put('/:id', updateMachine);
router.get('/schedules', getAllMaintenanceSchedules);
router.delete('/schedules/:id', deleteMaintenanceSchedule);

export default router;
