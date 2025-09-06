import express from 'express';
import { createMaintenanceSchedule, deleteMachine, getAllMachines, registerMachine, updateMachine } from '../controller/machine.controller.js';

const router = express.Router();

// POST: Register Employee
router.post('/register', registerMachine);
router.get('/', getAllMachines);
router.delete('/:id', deleteMachine);
router.post('/create', createMaintenanceSchedule);
router.put('/:id', updateMachine);

export default router;
