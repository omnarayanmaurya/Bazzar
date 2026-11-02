import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay';
import crypto from 'crypto';

// Global variables
const currency = 'INR';
const deliveryCharge = 10;

// Gateway initialize
const razorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Placing order using COD method
const placeOrderCod = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Placing order using Stripe method
const placeOrderStripe = async (req, res) => { };
console.log("Razorpay key configured:", !!process.env.RAZORPAY_KEY_ID);
console.log("Razorpay secret configured:", !!process.env.RAZORPAY_KEY_SECRET);
// Placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);

        await newOrder.save();

        const options = {
            amount: Math.round(amount * 100),
            currency: currency,
            receipt: newOrder._id.toString()
        };

        try {

            const order = await razorPayInstance.orders.create(options);

            res.json({ success: true, order });

        } catch (error) {

            await orderModel.findByIdAndDelete(newOrder._id);

            throw error;

        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Verify Razorpay payment
const verifyRazorpay = async (req, res) => {
    try {

        const {
            userId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.json({
                success: false,
                message: "Payment details are missing"
            });
        }

        // Generate expected signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        // Compare signatures safely
        const expectedBuffer = Buffer.from(expectedSignature, 'hex');
        const receivedBuffer = Buffer.from(razorpay_signature, 'hex');

        if (
            expectedBuffer.length !== receivedBuffer.length ||
            !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
        ) {
            return res.json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        // Fetch Razorpay order
        const orderInfo = await razorPayInstance.orders.fetch(
            razorpay_order_id
        );

        // Find the corresponding MongoDB order
        const orderData = await orderModel.findOne({
            _id: orderInfo.receipt,
            userId: userId
        });

        if (!orderData) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        if (orderData.paymentMethod !== "Razorpay") {
            return res.json({
                success: false,
                message: "Invalid payment method"
            });
        }

        // Fetch payment details
        const paymentInfo = await razorPayInstance.payments.fetch(
            razorpay_payment_id
        );

        if (
            paymentInfo.order_id !== razorpay_order_id ||
            paymentInfo.status !== "captured" ||
            paymentInfo.amount !== orderInfo.amount ||
            paymentInfo.currency !== currency
        ) {
            return res.json({
                success: false,
                message: "Payment verification failed"
            });
        }

        // Mark order as paid
        await orderModel.findByIdAndUpdate(orderData._id, {
            payment: true
        });

        // Clear user's cart
        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        });

        res.json({
            success: true,
            message: "Payment Successful"
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// All order data for admin panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// User order data for frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body;

        const orders = await orderModel.find({ userId });

        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update order status from admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.json({
                success: false,
                message: 'Order ID and status are required'
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status }
        );

        if (!updatedOrder) {
            return res.json({
                success: false,
                message: 'Order not found'
            });
        }

        return res.json({
            success: true,
            message: 'Status Updated'
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrderCod,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyRazorpay
};