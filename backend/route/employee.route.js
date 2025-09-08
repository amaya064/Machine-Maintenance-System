import express from 'express';
import { createLeave, deleteLeave, getEmployees, getLeaves, registerEmployee, updateLeaveStatus} from '../controller/employee.controller.js';

const router = express.Router();

router.post("/register", registerEmployee);
router.post("/leaves", createLeave);
router.get("/leaves", getLeaves);
router.get("/", getEmployees);
router.put("/leaves/:id", updateLeaveStatus);
router.delete("/leaves/:id", deleteLeave); 


export default router;
