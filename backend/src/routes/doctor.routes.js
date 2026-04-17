import express from 'express';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Get all doctors (public route)
router.get('/', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .select('-password -medicalHistory -allergies')
      .limit(50);

    res.json({ doctors });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: 'Failed to fetch doctors', details: error.message });
  }
});

// Get single doctor
router.get('/:id', async (req, res) => {
  try {
    const doctor = await User.findOne({
      _id: req.params.id,
      role: 'doctor',
    }).select('-password -medicalHistory -allergies');

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Get doctor's upcoming appointments count
    const upcomingAppointments = await Appointment.countDocuments({
      doctorId: doctor._id,
      appointmentDate: { $gte: new Date() },
      status: { $in: ['pending', 'confirmed'] },
    });

    res.json({
      doctor: {
        ...doctor.toObject(),
        upcomingAppointments,
      },
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ error: 'Failed to fetch doctor', details: error.message });
  }
});

export default router;


