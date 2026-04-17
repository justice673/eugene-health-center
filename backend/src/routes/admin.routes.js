import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Payment from '../models/Payment.js';
import Prescription from '../models/Prescription.js';
import MedicalRecord from '../models/MedicalRecord.js';
import Consultation from '../models/Consultation.js';
import Notification from '../models/Notification.js';
import ActivityLog from '../models/ActivityLog.js';
import SystemSettings from '../models/SystemSettings.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use((req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
});

// ==================== USER MANAGEMENT ====================

// Get all users with filters
router.get('/users', async (req, res) => {
  try {
    const { role, status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (role) query.role = role;
    if (status) query.subscriptionStatus = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

// Get single user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
});

// Update user (role, status, verification)
router.put('/users/:id', [
  body('role').optional().isIn(['user', 'admin', 'doctor']),
  body('subscriptionStatus').optional().isIn(['active', 'inactive', 'cancelled']),
  body('isEmailVerified').optional().isBoolean(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (['role', 'subscriptionStatus', 'isEmailVerified', 'fullName', 'phone', 'address'].includes(key)) {
        user[key] = updates[key];
      }
    });

    await user.save();

    // Log activity
    await ActivityLog.create({
      userId: req.user.userId,
      action: 'update_user',
      resource: 'user',
      resourceId: user._id,
      details: updates,
    });

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
});

// Suspend/Activate user
router.post('/users/:id/suspend', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.subscriptionStatus = user.subscriptionStatus === 'active' ? 'inactive' : 'active';
    await user.save();

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'suspend_user',
      resource: 'user',
      resourceId: user._id,
      details: { status: user.subscriptionStatus },
    });

    res.json({ message: `User ${user.subscriptionStatus === 'active' ? 'activated' : 'suspended'}`, user });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({ error: 'Failed to suspend user', details: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'delete_user',
      resource: 'user',
      resourceId: user._id,
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
});

// ==================== DOCTOR MANAGEMENT ====================

// Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .select('-password')
      .sort({ createdAt: -1 });

    // Get doctor stats
    const doctorsWithStats = await Promise.all(doctors.map(async (doctor) => {
      const appointments = await Appointment.countDocuments({ doctorId: doctor._id });
      const completed = await Appointment.countDocuments({ doctorId: doctor._id, status: 'completed' });
      const earnings = await Payment.aggregate([
        {
          $lookup: {
            from: 'appointments',
            localField: 'appointmentId',
            foreignField: '_id',
            as: 'appointment',
          },
        },
        { $unwind: '$appointment' },
        { $match: { 'appointment.doctorId': doctor._id, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);

      return {
        ...doctor.toObject(),
        stats: {
          totalAppointments: appointments,
          completedAppointments: completed,
          totalEarnings: earnings[0]?.total || 0,
        },
      };
    }));

    res.json({ doctors: doctorsWithStats });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: 'Failed to fetch doctors', details: error.message });
  }
});

// Get doctor details
router.get('/doctors/:id', async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select('-password');
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .sort({ appointmentDate: -1 })
      .limit(10);

    const consultations = await Consultation.find({ doctorId: doctor._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const earnings = await Payment.aggregate([
      {
        $lookup: {
          from: 'appointments',
          localField: 'appointmentId',
          foreignField: '_id',
          as: 'appointment',
        },
      },
      { $unwind: '$appointment' },
      { $match: { 'appointment.doctorId': doctor._id, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      doctor,
      appointments,
      consultations,
      totalEarnings: earnings[0]?.total || 0,
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ error: 'Failed to fetch doctor', details: error.message });
  }
});

// ==================== PATIENT MANAGEMENT ====================

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = { role: 'user' };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const patients = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      patients,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: 'Failed to fetch patients', details: error.message });
  }
});

// Get patient details with medical history
router.get('/patients/:id', async (req, res) => {
  try {
    const patient = await User.findById(req.params.id).select('-password');
    if (!patient || patient.role !== 'user') {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const appointments = await Appointment.find({ userId: patient._id })
      .sort({ appointmentDate: -1 });

    const prescriptions = await Prescription.find({ userId: patient._id })
      .sort({ createdAt: -1 });

    const medicalRecords = await MedicalRecord.find({ userId: patient._id })
      .sort({ createdAt: -1 });

    res.json({
      patient,
      appointments,
      prescriptions,
      medicalRecords,
    });
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ error: 'Failed to fetch patient', details: error.message });
  }
});

// ==================== APPOINTMENTS MANAGEMENT ====================

// Get all appointments with filters
router.get('/appointments', async (req, res) => {
  try {
    const { status, date, doctorId, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (doctorId) query.doctorId = doctorId;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.appointmentDate = { $gte: startDate, $lte: endDate };
    }

    const appointments = await Appointment.find(query)
      .populate('userId', 'fullName email phone')
      .populate('doctorId', 'fullName email')
      .sort({ appointmentDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Appointment.countDocuments(query);

    res.json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
  }
});

// Update appointment status
router.put('/appointments/:id', [
  body('status').optional().isIn(['pending', 'confirmed', 'completed', 'cancelled', 'no-show']),
], async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (req.body.status) appointment.status = req.body.status;
    if (req.body.doctorId) appointment.doctorId = req.body.doctorId;
    if (req.body.appointmentDate) appointment.appointmentDate = req.body.appointmentDate;
    if (req.body.appointmentTime) appointment.appointmentTime = req.body.appointmentTime;

    await appointment.save();

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'update_appointment',
      resource: 'appointment',
      resourceId: appointment._id,
      details: req.body,
    });

    res.json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ error: 'Failed to update appointment', details: error.message });
  }
});

// Cancel appointment
router.post('/appointments/:id/cancel', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'cancel_appointment',
      resource: 'appointment',
      resourceId: appointment._id,
    });

    res.json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ error: 'Failed to cancel appointment', details: error.message });
  }
});

// ==================== PRESCRIPTIONS MANAGEMENT ====================

// Get all prescriptions
router.get('/prescriptions', async (req, res) => {
  try {
    const { userId, doctorId, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (userId) query.userId = userId;
    if (doctorId) query.doctorId = doctorId;
    if (status) query.status = status;

    const prescriptions = await Prescription.find(query)
      .populate('userId', 'fullName email')
      .populate('doctorId', 'fullName email')
      .populate('appointmentId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Prescription.countDocuments(query);

    res.json({
      prescriptions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get prescriptions error:', error);
    res.status(500).json({ error: 'Failed to fetch prescriptions', details: error.message });
  }
});

// Create prescription
router.post('/prescriptions', [
  body('appointmentId').notEmpty(),
  body('userId').notEmpty(),
  body('doctorId').notEmpty(),
  body('medications').isArray().notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const prescription = await Prescription.create(req.body);

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'create_prescription',
      resource: 'prescription',
      resourceId: prescription._id,
    });

    res.status(201).json({ message: 'Prescription created successfully', prescription });
  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({ error: 'Failed to create prescription', details: error.message });
  }
});

// ==================== MEDICAL RECORDS MANAGEMENT ====================

// Get all medical records
router.get('/medical-records', async (req, res) => {
  try {
    const { userId, recordType, page = 1, limit = 20 } = req.query;
    const query = {};

    if (userId) query.userId = userId;
    if (recordType) query.recordType = recordType;

    const records = await MedicalRecord.find(query)
      .populate('userId', 'fullName email')
      .populate('uploadedBy', 'fullName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await MedicalRecord.countDocuments(query);

    res.json({
      records,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get medical records error:', error);
    res.status(500).json({ error: 'Failed to fetch medical records', details: error.message });
  }
});

// Upload medical record
router.post('/medical-records', [
  body('userId').notEmpty(),
  body('recordType').isIn(['lab_result', 'xray', 'scan', 'report', 'note', 'other']),
  body('title').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const record = await MedicalRecord.create({
      ...req.body,
      uploadedBy: req.user.userId,
    });

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'upload_medical_record',
      resource: 'medical_record',
      resourceId: record._id,
    });

    res.status(201).json({ message: 'Medical record uploaded successfully', record });
  } catch (error) {
    console.error('Upload medical record error:', error);
    res.status(500).json({ error: 'Failed to upload medical record', details: error.message });
  }
});

// ==================== CONSULTATIONS MANAGEMENT ====================

// Get all consultations
router.get('/consultations', async (req, res) => {
  try {
    const { userId, doctorId, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (userId) query.userId = userId;
    if (doctorId) query.doctorId = doctorId;
    if (status) query.status = status;

    const consultations = await Consultation.find(query)
      .populate('userId', 'fullName email')
      .populate('doctorId', 'fullName email')
      .populate('appointmentId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Consultation.countDocuments(query);

    res.json({
      consultations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations', details: error.message });
  }
});

// ==================== PAYMENTS & BILLING ====================

// Get all payments
router.get('/payments', async (req, res) => {
  try {
    const { status, paymentType, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (paymentType) query.paymentType = paymentType;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const payments = await Payment.find(query)
      .populate('userId', 'fullName email')
      .populate('appointmentId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Payment.countDocuments(query);

    // Calculate totals
    const totals = await Payment.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          completedAmount: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$amount', 0] },
          },
        },
      },
    ]);

    res.json({
      payments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      totals: totals[0] || { totalAmount: 0, completedAmount: 0 },
    });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ error: 'Failed to fetch payments', details: error.message });
  }
});

// Process refund
router.post('/payments/:id/refund', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({ error: 'Only completed payments can be refunded' });
    }

    payment.status = 'refunded';
    await payment.save();

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'refund_payment',
      resource: 'payment',
      resourceId: payment._id,
    });

    res.json({ message: 'Payment refunded successfully', payment });
  } catch (error) {
    console.error('Refund payment error:', error);
    res.status(500).json({ error: 'Failed to refund payment', details: error.message });
  }
});

// ==================== ANALYTICS & REPORTS ====================

// Get comprehensive analytics
router.get('/analytics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    // User stats
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const newUsers = await User.countDocuments({
      ...dateFilter,
      role: 'user',
    });

    // Appointment stats
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });
    const successRate = totalAppointments > 0
      ? ((completedAppointments / totalAppointments) * 100).toFixed(2)
      : 0;

    // Revenue stats
    const revenueData = await Payment.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          amount: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Appointment trends
    const appointmentTrends = await Appointment.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$appointmentDate' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      users: {
        total: totalUsers,
        doctors: totalDoctors,
        new: newUsers,
      },
      appointments: {
        total: totalAppointments,
        completed: completedAppointments,
        cancelled: cancelledAppointments,
        successRate: parseFloat(successRate),
      },
      revenue: {
        daily: revenueData,
        total: revenueData.reduce((sum, day) => sum + day.amount, 0),
      },
      trends: {
        appointments: appointmentTrends,
      },
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics', details: error.message });
  }
});

// ==================== NOTIFICATIONS ====================

// Get all notifications
router.get('/notifications', async (req, res) => {
  try {
    const { type, isRead, page = 1, limit = 20 } = req.query;
    const query = {};

    if (type) query.type = type;
    if (isRead !== undefined) query.isRead = isRead === 'true';

    const notifications = await Notification.find(query)
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ ...query, isRead: false });

    res.json({
      notifications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      unreadCount,
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications', details: error.message });
  }
});

// Create notification
router.post('/notifications', [
  body('userId').notEmpty(),
  body('type').isIn(['appointment', 'payment', 'prescription', 'system', 'reminder']),
  body('title').notEmpty(),
  body('message').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const notification = await Notification.create(req.body);

    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: 'Failed to create notification', details: error.message });
  }
});

// ==================== SYSTEM SETTINGS ====================

// Get system settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await SystemSettings.getSettings();
    res.json({ settings });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings', details: error.message });
  }
});

// Update system settings
router.put('/settings', async (req, res) => {
  try {
    const settings = await SystemSettings.getSettings();
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        settings[key] = req.body[key];
      }
    });
    await settings.save();

    await ActivityLog.create({
      userId: req.user.userId,
      action: 'update_settings',
      resource: 'system',
      details: req.body,
    });

    res.json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings', details: error.message });
  }
});

// ==================== ACTIVITY LOGS ====================

// Get activity logs
router.get('/activity-logs', async (req, res) => {
  try {
    const { userId, resource, startDate, endDate, page = 1, limit = 50 } = req.query;
    const query = {};

    if (userId) query.userId = userId;
    if (resource) query.resource = resource;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const logs = await ActivityLog.find(query)
      .populate('userId', 'fullName email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ActivityLog.countDocuments(query);

    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ error: 'Failed to fetch activity logs', details: error.message });
  }
});

export default router;

