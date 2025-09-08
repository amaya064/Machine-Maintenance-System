import express from 'express';
import { createLeave, getEmployees, getLeaves, registerEmployee} from '../controller/employee.controller.js';

const router = express.Router();

router.post("/register", registerEmployee);
router.post("/leaves", createLeave);
router.get("/leaves", getLeaves);
router.get("/", getEmployees);


export default router;
