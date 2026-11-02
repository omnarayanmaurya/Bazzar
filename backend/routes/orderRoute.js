import express from 'express';

import {
    placeOrderCod,
    placeOrderStripe,
    placeOrderRazorpay,
    verifyRazorpay,
    allOrders,
    userOrders,
    updateStatus
} from '../controllers/orderController.js';

import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';

const orderRouter = express.Router();

// Admin
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment methods
orderRouter.post('/cod', userAuth, placeOrderCod);
orderRouter.post('/stripe', userAuth, placeOrderStripe);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

// User features
orderRouter.post('/userorders', userAuth, userOrders);

// Verify Razorpay payment
orderRouter.post('/verifyRazorpay', userAuth, verifyRazorpay);

export default orderRouter;