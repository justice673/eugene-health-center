import express from 'express';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Process payment (simulated)
router.post('/', async (req, res) => {
  try {
    const {
      amount,
      paymentMethod,
      paymentType,
      appointmentId,
      subscriptionPlan,
      paymentDetails,
    } = req.body;

    if (!amount || !paymentMethod || !paymentType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

    if (!isSuccess) {
      return res.status(400).json({ error: 'Payment failed. Please try again.' });
    }

    // Create payment record
    const payment = await Payment.create({
      userId: req.user.userId,
      appointmentId,
      amount,
      paymentMethod,
      paymentType,
      status: 'completed',
      transactionId,
      paymentDetails,
    });

    // Update user subscription if applicable
    if (paymentType === 'subscription' && subscriptionPlan) {
      await User.findByIdAndUpdate(req.user.userId, {
        subscriptionPlan,
        subscriptionStatus: 'active',
      });
    }

    res.json({
      message: 'Payment processed successfully',
      payment: {
        id: payment._id,
        transactionId: payment.transactionId,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        createdAt: payment.createdAt,
      },
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed', details: error.message });
  }
});

// Get payment history
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ payments });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: 'Failed to fetch payments', details: error.message });
  }
});

// Get single payment
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ payment });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ error: 'Failed to fetch payment', details: error.message });
  }
});

export default router;


