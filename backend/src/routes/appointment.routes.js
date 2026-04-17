import express from 'express';
import Appointment from '../models/Appointment.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all appointments for user
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = { userId: req.user.userId };

    if (status === 'upcoming') {
      query.appointmentDate = { $gte: new Date() };
      query.status = { $in: ['pending', 'confirmed'] };
    } else if (status === 'past') {
      query.$or = [
        { appointmentDate: { $lt: new Date() } },
        { status: { $in: ['completed', 'cancelled', 'no-show'] } },
      ];
    }

    const appointments = await Appointment.find(query)
      .sort({ appointmentDate: -1 })
      .limit(100);

    res.json({ appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
  }
});

// Get single appointment
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ appointment });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ error: 'Failed to fetch appointment', details: error.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const {
      doctorName,
      doctorSpecialty,
      consultationType,
      appointmentDate,
      appointmentTime,
      reason,
      symptoms,
      paymentAmount,
      paymentMethod,
    } = req.body;

    if (!doctorName || !doctorSpecialty || !consultationType || !appointmentDate || !appointmentTime || !reason || !paymentAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const appointment = await Appointment.create({
      userId: req.user.userId,
      doctorName,
      doctorSpecialty,
      consultationType,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason,
      symptoms,
      paymentAmount,
      paymentMethod,
      paymentStatus: 'paid',
      status: 'confirmed',
      meetingLink: `https://meet.eugeneonlinehealth.com/${Date.now()}`,
    });

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment,
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Failed to create appointment', details: error.message });
  }
});

// Update appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({
      message: 'Appointment updated successfully',
      appointment,
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ error: 'Failed to update appointment', details: error.message });
  }
});

// Cancel appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({
      message: 'Appointment cancelled successfully',
      appointment,
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ error: 'Failed to cancel appointment', details: error.message });
  }
});

export default router;


