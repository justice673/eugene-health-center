import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Medication from '@/models/Medication';

/**
 * GET /api/medications
 * Get all medications (public route)
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query: any = { isActive: true };

    if (category) {
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
      .limit(100);

    return NextResponse.json(
      { medications },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get medications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medications', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/medications
 * Create a new medication (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      name,
      category,
      description,
      dosage,
      price,
      stock,
      manufacturer,
      requiresPrescription,
      sideEffects,
      contraindications,
    } = body;

    // Validation
    if (!name || !category || !description || !dosage || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create medication
    const medication = await Medication.create({
      name,
      category,
      description,
      dosage,
      price,
      stock,
      manufacturer,
      requiresPrescription: requiresPrescription !== false,
      sideEffects: sideEffects || [],
      contraindications: contraindications || [],
    });

    return NextResponse.json(
      {
        message: 'Medication created successfully',
        medication,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create medication error:', error);
    return NextResponse.json(
      { error: 'Failed to create medication', details: error.message },
      { status: 500 }
    );
  }
}


