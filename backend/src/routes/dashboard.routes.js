import express from 'express';
import Appointment from '../models/Appointment.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get user dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get upcoming appointments
    const upcomingAppointments = await Appointment.countDocuments({
      userId,
      appointmentDate: { $gte: new Date() },
      status: { $in: ['pending', 'confirmed'] },
    });

    // Get total appointments
    const totalAppointments = await Appointment.countDocuments({ userId });

    // Get total payments
    const totalPayments = await Payment.aggregate([
      { $match: { userId: userId, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Get user
    const user = await User.findById(userId);

    res.json({
      stats: {
        upcomingAppointments,
        totalAppointments,
        totalSpent: totalPayments[0]?.total || 0,
        subscriptionPlan: user?.subscriptionPlan || 'None',
        subscriptionStatus: user?.subscriptionStatus || 'inactive',
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats', details: error.message });
  }
});

// Get admin dashboard stats
router.get('/admin/stats', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Total users
    const totalUsers = await User.countDocuments();

    // Total appointments today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentsToday = await Appointment.countDocuments({
      appointmentDate: { $gte: today },
      status: { $in: ['pending', 'confirmed'] },
    });

    // Total medications
    const Medication = (await import('../models/Medication.js')).default;
    const totalMedications = await Medication.countDocuments({ isActive: true });

    // Monthly revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    res.json({
      stats: {
        totalUsers,
        appointmentsToday,
        totalMedications,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats', details: error.message });
  }
});

export default router;


