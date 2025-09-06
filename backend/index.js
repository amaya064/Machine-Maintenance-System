import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import employeeRouter from "./route/employee.route.js";
import machineRouter from './route/machine.route.js';
import productRouter from './route/product.route.js';
import paymentRouter from './route/payment.route.js';
import orderRouter from './route/order.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Routes path
app.use("/api/employees", employeeRouter);
app.use('/api/machines', machineRouter);
app.use('/api/products', productRouter);
app.use('/api/payment', paymentRouter);

app.use('/api/orders', orderRouter);




// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(3000, () => {
  console.log('Server running on port 3000!');
});
