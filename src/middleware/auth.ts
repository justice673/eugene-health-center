import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken } from '@/lib/auth';

/**
 * Authentication Middleware
 * Protects API routes and verifies JWT tokens
 */

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export async function authMiddleware(
  request: NextRequest
): Promise<{ authorized: boolean; user?: any; error?: string }> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractToken(authHeader);

    if (!token) {
      return {
        authorized: false,
        error: 'No authentication token provided',
      };
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return {
        authorized: false,
        error: 'Invalid or expired token',
      };
    }

    return {
      authorized: true,
      user: decoded,
    };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return {
      authorized: false,
      error: 'Authentication failed',
    };
  }
}

// Role-based authorization
export function requireRole(allowedRoles: string[]) {
  return async (request: NextRequest) => {
    const auth = await authMiddleware(request);

    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      );
    }

    if (!allowedRoles.includes(auth.user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return auth;
  };
}


