// routes/breakdown.js
import express from 'express';
import { 
  createBreakdown, 
  getAllBreakdowns, 
  getBreakdownById, 
  updateBreakdown, 
  deleteBreakdown 
} from '../controller/breakdown.controller.js';

const router = express.Router();

router.post('/', createBreakdown);
router.get('/', getAllBreakdowns);
router.get('/:id', getBreakdownById);
router.put('/:id', updateBreakdown);
router.delete('/:id', deleteBreakdown);

export default router;