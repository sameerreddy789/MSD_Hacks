import express from 'express';
import {
  createOrder,
  verifyPayment,
  getMyOrders,
  getOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrder);

export default router;
