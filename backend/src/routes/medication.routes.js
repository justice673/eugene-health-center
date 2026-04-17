import express from 'express';
import Medication from '../models/Medication.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all medications (public route, but admin can see all)
router.get('/', async (req, res) => {
  try {
    const { category, search, includeInactive } = req.query;
    let query = {};

    // If not admin or includeInactive not set, only show active
    if (includeInactive !== 'true') {
      query.isActive = true;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const medications = await Medication.find(query)
      .sort({ name: 1 })
      .limit(1000); // Increased limit for admin

    res.json({ medications });
  } catch (error) {
    console.error('Get medications error:', error);
    res.status(500).json({ error: 'Failed to fetch medications', details: error.message });
  }
});

// Get single medication
router.get('/:id', async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication || !medication.isActive) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json({ medication });
  } catch (error) {
    console.error('Get medication error:', error);
    res.status(500).json({ error: 'Failed to fetch medication', details: error.message });
  }
});

// Create medication (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const {
      name,
      genericName,
      category,
      form,
      strength,
      description,
      price,
      stock,
      manufacturer,
      prescriptionRequired,
      sideEffects,
      contraindications,
    } = req.body;

    if (!name || !genericName || !category || !form || !strength || !description) {
      return res.status(400).json({ error: 'Missing required fields: name, genericName, category, form, strength, description' });
    }

    const medication = await Medication.create({
      name,
      genericName,
      category,
      form,
      strength,
      description,
      price: price || 0,
      stock: stock || 0,
      manufacturer,
      prescriptionRequired: prescriptionRequired !== false,
      sideEffects: sideEffects || [],
      contraindications: contraindications || [],
    });

    res.status(201).json({
      message: 'Medication created successfully',
      medication,
    });
  } catch (error) {
    console.error('Create medication error:', error);
    res.status(500).json({ error: 'Failed to create medication', details: error.message });
  }
});

// Update medication (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json({
      message: 'Medication updated successfully',
      medication,
    });
  } catch (error) {
    console.error('Update medication error:', error);
    res.status(500).json({ error: 'Failed to update medication', details: error.message });
  }
});

// Delete medication (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }

    res.json({
      message: 'Medication deleted successfully',
      medication,
    });
  } catch (error) {
    console.error('Delete medication error:', error);
    res.status(500).json({ error: 'Failed to delete medication', details: error.message });
  }
});

export default router;


