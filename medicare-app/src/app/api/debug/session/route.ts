import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

/**
 * GET /api/debug/session
 *
 * Development-only endpoint to inspect current session state.
 * Helps diagnose authentication and authorization issues.
 *
 * Returns 403 in production for security.
 *
 * Usage:
 * Navigate to http://localhost:3000/api/debug/session while logged in
 *
 * Example Response:
 * {
 *   "timestamp": "2024-01-15T12:00:00.000Z",
 *   "isAuthenticated": true,
 *   "session": {
 *     "user": {
 *       "id": "uuid",
 *       "name": "John Doe",
 *       "email": "john@example.com",
 *       "role": "PATIENT"
 *     }
 *   },
 *   "canAccessPatientPortal": true,
 *   "canAccessDashboard": false,
 *   "recommendedRoute": "/patient-portal"
 * }
 */
export async function GET() {
  // Security: Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      {
        error: 'Debug endpoint only available in development',
        hint: 'Set NODE_ENV=development to access this endpoint'
      },
      { status: 403 }
    );
  }

  try {
    const session = await auth();

    // Determine access permissions based on role
    const userRole = session?.user?.role;
    const canAccessPatientPortal = userRole === 'PATIENT';
    const canAccessDashboard = userRole === 'SUPER_ADMIN' || userRole === 'ADMIN';

    // Recommend appropriate route based on role
    let recommendedRoute = '/login';
    if (canAccessPatientPortal) {
      recommendedRoute = '/patient-portal';
    } else if (canAccessDashboard) {
      recommendedRoute = '/dashboard';
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      isAuthenticated: !!session,
      session: session
        ? {
            user: {
              id: session.user.id,
              name: session.user.name,
              email: session.user.email,
              role: session.user.role,
            },
          }
        : null,
      permissions: {
        canAccessPatientPortal,
        canAccessDashboard,
      },
      recommendedRoute,
      routes: {
        patientPortal: '/patient-portal',
        dashboard: '/dashboard',
        login: '/login',
      },
      troubleshooting: {
        notAuthenticated: !session
          ? 'You are not logged in. Navigate to /login to authenticate.'
          : null,
        wrongRoleForPatientPortal: session && !canAccessPatientPortal
          ? `Your role is ${userRole}. Patient Portal requires PATIENT role.`
          : null,
        wrongRoleForDashboard: session && !canAccessDashboard
          ? `Your role is ${userRole}. Dashboard requires SUPER_ADMIN or ADMIN role.`
          : null,
      },
    });
  } catch (error) {
    console.error('[DEBUG SESSION] Error fetching session:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch session',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
