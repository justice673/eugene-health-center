import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import User from '@/models/User';
import { authMiddleware } from '@/middleware/auth';

/**
 * POST /api/payments
 * Process a payment (simulated)
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
      amount,
      paymentMethod,
      paymentType,
      appointmentId,
      subscriptionPlan,
      paymentDetails,
    } = body;

    // Validation
    if (!amount || !paymentMethod || !paymentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate simulated transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate payment success (95% success rate)
    const isSuccess = Math.random() > 0.05;

    if (!isSuccess) {
      return NextResponse.json(
        { error: 'Payment failed. Please try again.' },
        { status: 400 }
      );
    }

    // Create payment record
    const payment = await Payment.create({
      userId: auth.user.userId,
      appointmentId,
      amount,
      paymentMethod,
      paymentType,
      status: 'completed',
      transactionId,
      paymentDetails,
    });

    // If subscription payment, update user subscription
    if (paymentType === 'subscription' && subscriptionPlan) {
      await User.findByIdAndUpdate(auth.user.userId, {
        subscriptionPlan,
        subscriptionStatus: 'active',
      });
    }

    return NextResponse.json(
      {
        message: 'Payment processed successfully',
        payment: {
          id: payment._id,
          transactionId: payment.transactionId,
          amount: payment.amount,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          createdAt: payment.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payments
 * Get payment history for authenticated user
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

    const payments = await Payment.find({ userId: auth.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(
      { payments },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments', details: error.message },
      { status: 500 }
    );
  }
}


