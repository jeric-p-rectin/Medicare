import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // API routes for authentication
  const isAuthRoute = pathname.startsWith('/api/auth');

  // Static files and assets
  const isStaticFile = pathname.startsWith('/_next') ||
                       pathname.startsWith('/favicon') ||
                       pathname.includes('.');

  // Allow static files
  if (isStaticFile || isAuthRoute) {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;

  // Debug logging for auth issues
  if (process.env.NODE_ENV === 'development' && !token) {
    console.log('[MIDDLEWARE] getToken returned null - NEXTAUTH_SECRET may be wrong or missing');
  }

  // Public routes handling
  if (isPublicRoute) {
    // If logged in and trying to access login page, redirect based on role
    if (isLoggedIn && pathname === '/login') {
      if (userRole === 'PATIENT') {
        return NextResponse.redirect(new URL('/patient-portal', request.url));
      } else {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based route protection

  // Patient-only routes
  if (pathname.startsWith('/patient-portal')) {
    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('[MIDDLEWARE] Patient Portal Access Attempt:', {
        pathname,
        isLoggedIn,
        userRole,
        userId: token?.id,
        userName: token?.name,
        timestamp: new Date().toISOString()
      });
    }

    if (userRole !== 'PATIENT') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[MIDDLEWARE] Access Denied - Wrong Role:', {
          requiredRole: 'PATIENT',
          actualRole: userRole,
          redirectTo: '/dashboard'
        });
      }

      const dashboardUrl = new URL('/dashboard', request.url);
      dashboardUrl.searchParams.set('error', 'patient_only');
      return NextResponse.redirect(dashboardUrl);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[MIDDLEWARE] Patient Portal Access Granted');
    }

    return NextResponse.next();
  }

  // Admin-only routes (block patients)
  const adminOnlyRoutes = ['/patients', '/registration', '/statistics', '/alerts'];
  const isAdminRoute = adminOnlyRoutes.some(route => pathname.startsWith(route));

  if (isAdminRoute && userRole === 'PATIENT') {
    return NextResponse.redirect(new URL('/patient-portal', request.url));
  }

  // Dashboard route - redirect patients to patient portal
  if (pathname.startsWith('/dashboard') && userRole === 'PATIENT') {
    return NextResponse.redirect(new URL('/patient-portal', request.url));
  }

  // Account route - allow all authenticated users
  // (already protected by authentication check above)

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
