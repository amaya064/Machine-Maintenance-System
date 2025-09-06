import express from 'express';
import { createOrder, deleteOrder, getOrders } from '../controller/order.controller.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/list', getOrders);
router.delete('/:id', deleteOrder);

export default router;
