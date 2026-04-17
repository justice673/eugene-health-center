import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import { authMiddleware } from '@/middleware/auth';

/**
 * GET /api/appointments
 * Get all appointments for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // upcoming, past, all

    let query: any = { userId: auth.user.userId };

    // Filter by status
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

    return NextResponse.json(
      { appointments },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/appointments
 * Create a new appointment
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await authMiddleware(request);
    
    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
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
    } = body;

    // Validation
    if (!doctorName || !doctorSpecialty || !consultationType || !appointmentDate || !appointmentTime || !reason || !paymentAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId: auth.user.userId,
      doctorName,
      doctorSpecialty,
      consultationType,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason,
      symptoms,
      paymentAmount,
      paymentMethod,
      paymentStatus: 'paid', // Simulated payment
      status: 'confirmed',
      meetingLink: `https://meet.eugeneonlinehealth.com/${Date.now()}`, // Simulated meeting link
    });

    return NextResponse.json(
      {
        message: 'Appointment created successfully',
        appointment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create appointment error:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment', details: error.message },
      { status: 500 }
    );
  }
}


