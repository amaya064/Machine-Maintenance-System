import express from 'express';
import { createPayment, deletePayment, getAllPayments, getOrdersForEmail, getPaymentsByEmail } from '../controller/payment.controller.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:email', getOrdersForEmail);
router.get('/payments/:email', getPaymentsByEmail);
router.delete('/:id', deletePayment);



export default router;
